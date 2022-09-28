import * as Handlebars from "handlebars";
import openChatTemplate from "./openChat.tmpl";
// import { Input } from "../../../components/input";
import { Message } from "../../../components/message";
// import { Modal } from "../../../components/modal";
import "./chat-open.scss";
import { ChatController, IChatData } from '../../../controllers';
import router from '../../../router';
import {
    avatarIconBase64,
    checkValidation,
    createChatWebSocket,
} from '../../../utils';
// import { PopoverItem } from "../../../components/popoverItem";
// import { Dictionary } from "../../../utils";
import arrowIcon from "../../../assets/icons/arrow-back.svg";
import addIcon from "../../../assets/icons/add.svg";
import addFileIcon from "../../../assets/icons/add-file.svg";
import addLocationIcon from "../../../assets/icons/add-location.svg";
import addPhotoIcon from "../../../assets/icons/add-photo.svg";
import deleteUserIcon from "../../../assets/icons/delete-user.svg";
import addUserIcon from "../../../assets/icons/add-user.svg";
import readIcon from "../../../assets/icons/read.svg";
import dot from "../../../assets/icons/dot.svg"
// import { openModal, showPopover, checkAndCollectDataFromInput } from "../../../utils";
// import { PopoverHandler } from "../../../components/popoverHandler";
// import { Popover } from "../../../components/popover";
import { Block, Dictionary } from "../../../utils";
import { closeModal, showModal } from '../chat';
import { store } from '../../../store';
import {Input} from "../../../components/input";
import {Btn} from "../../../components/btn";
import {Form} from "../../../components/form";
import {Modal} from "../../../components/modal";

const chatController = new ChatController();

const getDataFromChat = (
    currentChatId: string,
    localStorageKey: string,
    valueKey: string
) => {
    let value: string | string[] = valueKey === 'users' ? [] : '';
    const item = localStorage.getItem(localStorageKey);
    let chats;
    if (item) {
        chats = JSON.parse(item);
    }

    if (currentChatId && chats) {
        const chat = chats.filter(
            (el: IChatData) => el.id.toString() === currentChatId
        );
        if (chat.length > 0) {
            value = chat[0][valueKey];
        }
    }

    return value;
};

const sendMessage = async (socket: WebSocket) => {
    const messageInput = document.querySelector(
        '.chat-open-send__field'
    ) as HTMLInputElement;
    const message = {
        content: messageInput.value,
        type: 'message',
    };
    socket.send(JSON.stringify(message));
    messageInput.value = '';
    await chatController.getAllChats();
    router.go('/open-messenger');
};

const getOldMessages = (socket: WebSocket) => {
    socket.addEventListener('open', () => {
        socket.send(
            JSON.stringify({
                content: '0',
                type: 'get old',
            })
        );
    });
};

const handleMessages = (message: Dictionary | Dictionary[]) => {
    const isMessagesArray = message instanceof Array;
    const messagesContainer = document.querySelector('.messages__container');
    const chatContainer = document.querySelector('.chat-open__container');

    const addMessage = (elem: Dictionary) => {
        if (elem.content) {
            const myMessage = elem.user_id == localStorage.getItem('myID');
            const dateObject = new Date(elem.time);
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            const time = new Intl.DateTimeFormat('ru-RU', options).format(dateObject);
            const node = new Message({
                myMessage,
                time,
                read: elem.is_read,
                text: elem.content,
                readIcon: readIcon,
                //image: file,
            });
            messagesContainer.appendChild(node.render());
        }
    };

    if (isMessagesArray) {
        // revert array of messages
        message.map((_, index, array) =>
            addMessage(array[array.length - 1 - index])
        );
    } else {
        addMessage(message);
    }
    console.log(chatContainer)
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

const getTemplate = () => {
    const template = Handlebars.compile(openChatTemplate);

    const wsParamsString = localStorage.getItem('wsParams');
    let wsParams;
    if (wsParamsString) {
        wsParams = JSON.parse(wsParamsString);
    }

    const socket = createChatWebSocket(wsParams, handleMessages);

    getOldMessages(socket);

    const currentChatId = localStorage.getItem('currentChat');

    const addUsersToChat = async (chatId: string) => {
        const input = document.querySelector('.new-user-input') as HTMLInputElement;
        const usersArray = input.value.split(',');
        const users = usersArray.map((s) => s.trim());
        await chatController.addUser({ users, chatId: parseInt(chatId, 10) });
        store.setStateAndPersist({ usersInChats: [{ id: chatId, users }] });
        closeModal('add-user-modal', '.new-user-input');
        router.go('/open-messenger');
    };

    const removeUsersFromChat = async (chatId: string) => {
        const input = document.querySelector(
            '.remove-user-input'
        ) as HTMLInputElement;
        const users = input.value.split(',');
        await chatController.removeUser({ users, chatId: parseInt(chatId, 10) });
        closeModal('remove-user-modal', '.remove-user-input');
        router.go('/open-messenger');
    };

    const addUserInput = new Input({
        name: 'title',
        label: 'Введите ID пользователя',
        type: 'text',
        required: true,
        dataType: 'text',
        inputClassName: 'new-user-input',
    });

    const backLink = new Btn(
        {
            btnType: 'button',
            linkText: 'Отмена',
            isLink: true,
        },
        {
            click: () => {
                closeModal('add-user-modal', '.add-user-input');
                closeModal('remove-user-modal', '.remove-user-input');
            },
        }
    );

    const addUserBtn = new Btn(
        {
            btnType: "submit",
            btnText: "Добавить",
            btnClassName: ""
        }
    )

    const removeUserInput = new Input({
        name: 'title',
        label: 'Введите ID пользователя',
        type: 'text',
        required: true,
        dataType: 'text',
        inputClassName: 'remove-user-input',
    });

    const removeUserBtn = new Btn(
        {
            btnType: "submit",
            btnText: "Удалить",
            btnClassName: ""
        }
    )

    const addUserForm = new Form(
        {
            input: addUserInput.transformToString(),
            btn: addUserBtn.transformToString(),
        },
        {
            submit: async () => {
                await addUsersToChat(currentChatId || '');
            },
        }
    );

    const removeUserForm = new Form(
        {
            input: removeUserInput.transformToString(),
            btn: removeUserBtn.transformToString(),
        },
        {
            submit: async () => {
                await removeUsersFromChat(currentChatId || '');
            },
        }
    );

    const addUserModal = new Modal (
        {
            dataId: "add-user-modal",
            titleText: "Добавить пользователя",
            form: addUserForm.transformToString(),
            backLink: backLink.transformToString()
        }
    );

    const removeUserModal = new Modal (
        {
            dataId: "remove-user-modal",
            titleText: "Удалить пользователя",
            form: removeUserForm.transformToString(),
            backLink: backLink.transformToString()
        }
    );

    const message = new Input(
        {
            name: 'message',
            type: 'text',
            dataType: 'message',
            inputClassName: "chat-open-send__field",
            wrapperClassName: "chat-open-send__field-wrapper",
            placeholder: "Сообщение",
        },
        {
            focus: (event: Event) => {
                checkValidation({ event });
            },
            blur: (event: Event) => {
                checkValidation({ event });
            },
            keyup: (event: KeyboardEvent) => {
                if (['Enter', 'NumpadEnter'].includes(event.key)) {
                    event.preventDefault();
                    sendMessage(socket);
                }
            },
        }
    );

    const sendButton = new Btn(
        {
            isLink: true,
            icon: arrowIcon,
            btnClassName: 'chat-open-send__btn',
            btnType: 'button',
        },
        {
            click: () => {
                sendMessage(socket);
            },
        }
    );

    const newUser = new Btn (
        {
            btnClassName: 'chat-open__popover-item',
            btnType: 'button',
            isLink: true,
            icon: addUserIcon,
            linkText: 'Добавить пользователя',
        },
        {
            click: async () => {
                await showModal('add-user-modal');
            },
        }
    );

    const removeUser = new Btn (
        {
            btnClassName: 'chat-open__popover-item',
            btnType: 'button',
            isLink: true,
            icon: deleteUserIcon,
            linkText: 'Удалить пользователя',
        },
        {
            click: async () => {
                await showModal('remove-user-modal');
            },
        }
    );

    const userActionsPopoverTrigger = new Btn (
        {
            btnClassName: 'chat-open-actions__btn',
            btnType: 'button',
            isLink: true,
            icon: dot,
        },
        {
            click: async () => {
                await showModal('user-actions-popover');
            },
        }
    )

    // const messageInput = new Input(
    //     {
    //         name: "message",
    //         type: "text",
    //         inputClassName: "chat-open-send__field",
    //         wrapperClassName: "chat-open-send__field-wrapper",
    //         placeholder: "Сообщение",
    //     },
    //     {
    //         blur: (event: Event) => {
    //             checkAndCollectDataFromInput(event);
    //         },
    //     }
    // );
    //
    // const messages1 = new Message({
    //     myMessage: false,
    //     text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — ик слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали толькокассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всегоих было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
    //     time: "11:56",
    // });
    //
    // const messages2 = new Message({
    //     myMessage: false,
    //     image: "",
    //     time: "11:56",
    // });
    //
    // const messages3 = new Message({
    //     myMessage: true,
    //     read: true,
    //     text: "Круто!",
    //     time: "12:00",
    //     readIcon,
    // });
    //
    // const popoverItemsArr1 = [
    //     new PopoverItem(
    //         {
    //             img: addUserIcon,
    //             imgDescr: "Добавить пользователя",
    //             text: "Добавить пользователя",
    //             className: 'modal-trigger',
    //             id: nanoid(6),
    //             dataModal: "addUser-modal"
    //         },
    //     {
    //             click: (event: Event) => {
    //                 openModal({ event })
    //             },
    //         }
    //     ),
    //
    //     new PopoverItem(
    //         {
    //             img: deleteUserIcon,
    //             imgDescr: "Удалить пользователя",
    //             text: "Удалить пользователя",
    //             className: 'modal-trigger',
    //             id: nanoid(6),
    //             dataModal: "deleteUser-modal"
    //         },
    //         {
    //             click: (event: Event) => {
    //                 openModal({ event })
    //             },
    //         }
    //     )
    // ];
    //
    // const popover1 = new Popover({
    //     popoverItems: popoverItemsArr1.map((popoverItem: Dictionary) => popoverItem.transformToString()),
    //     className: "popover--top-right"
    // })
    //
    // const popoverItemsArr2 = [
    //     new PopoverItem(
    //         {
    //             img: addPhotoIcon,
    //             imgDescr: "Прикрепить фото или видео",
    //             text: "Фото или Видео",
    //             id: nanoid(6),
    //         }
    //     ),
    //
    //     new PopoverItem(
    //         {
    //             img: addFileIcon,
    //             imgDescr: "Прикрепить файл",
    //             text: "Файл",
    //             id: nanoid(6),
    //         }
    //     ),
    //
    //     new PopoverItem (
    //         {
    //             img: addLocationIcon,
    //             imgDescr: "Прикрепить локацию",
    //             text: "Локация",
    //             id: nanoid(6),
    //         }
    //     )
    // ];
    //
    // const popover2 = new Popover({
    //     popoverItems: popoverItemsArr2.map((popoverItem: Dictionary) => popoverItem.transformToString()),
    //     className: "popover--bottom-left"
    // })
    //
    // const modals = [
    //     new Modal (
    //         {
    //             id: "deleteUser-modal",
    //             titleText: "Удалить пользователя",
    //             labelText: "ID",
    //             inputId: "deleteUserField",
    //             required: false,
    //             inputType: "text",
    //             buttonText: "Удалить",
    //             linkHref: "javascript:void(0)",
    //             linkText: "Отмена",
    //         }
    //     ),
    //
    //     new Modal (
    //         {
    //             id: "addUser-modal",
    //             titleText: "Добавить пользователя",
    //             labelText: "ID",
    //             inputId: "addUserInput",
    //             required: false,
    //             inputType: "text",
    //             buttonText: "Добавить",
    //             linkHref: "javascript:void(0)",
    //             linkText: "Отмена",
    //         }
    //     )
    // ]
    //
    // const popoverHandler1 = new PopoverHandler({
    //      classNameBtn: "chat-open-actions__btn",
    //      classNameSpan: "chat-open-actions__dot",
    //      id: nanoid(6),
    // },
    //     {
    //         click: (event: Event) => {
    //             showPopover({ event })
    //         },
    //     }
    // );
    //
    // const popoverHandler2 = new PopoverHandler({
    //      classNameBtn: "chat-open-send__attachment",
    //      classNameImg: "chat-open-send__attachment-img",
    //      descrImg: "Прикрепить вложение",
    //      srcImg: addIcon,
    //      id: nanoid(6),
    // },
    //     {
    //         click: (event: Event) => {
    //             showPopover({ event })
    //         },
    //     }
    // );

    const context = {
        readIcon,
        addIcon,
        arrowIcon,
        addUserModal: addUserModal.transformToString(),
        removeUserModal: removeUserModal.transformToString(),
        sendButton: sendButton.transformToString(),
        chatTitle: getDataFromChat(currentChatId || '', 'chats', 'title'),
        message: message.transformToString(),
        users: getDataFromChat(currentChatId || '', 'usersInChats', 'users'),
        avatarIcon: avatarIconBase64,
        newUser: newUser.transformToString(),
        removeUser: removeUser.transformToString(),
        userActionsPopoverTrigger: userActionsPopoverTrigger.transformToString(),
        // messageInput: messageInput.transformToString(),
        // messages: [messages1.transformToString(), messages2.transformToString(),messages3.transformToString()],
        // popover1: popover1.transformToString(),
        // popover2: popover2.transformToString(),
        // modals: modals.map((modal: Dictionary) => modal.transformToString()),
        // popoverHandler1: popoverHandler1.transformToString(),
        // popoverHandler2: popoverHandler2.transformToString(),
    };


    return template(context);
}

export class OpenChat extends Block {
    constructor(context = {}, events = {}) {
        super(
            'div',
            {
                context: {
                    ...context,
                },
                template: getTemplate(),
                events,
            },
            'chat-open'
        );
    }
}
