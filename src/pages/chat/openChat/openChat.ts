import * as Handlebars from "handlebars";
import openChatTemplate from "./openChat.tmpl";
import { Message } from "../../../components/message";
import "./chat-open.scss";
import { ChatController, IChatData } from "../../../controllers";
import router from "../../../router";
import {
    avatarIconBase64,
    checkValidation,
    createChatWebSocket,
} from "../../../utils";
import arrowIcon from "../../../static/icons/arrow-back.svg";
import addIcon from "../../../static/icons/add.svg";
import deleteUserIcon from "../../../static/icons/delete-user.svg";
import addUserIcon from "../../../static/icons/add-user.svg";
import readIcon from "../../../static/icons/read.svg";
import dot from "../../../static/icons/dot.svg"
import { Block, Dictionary } from "../../../utils";
import { closeModal, showModal } from "../chat";
import { store } from "../../../store";
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
    let value: string | string[] = valueKey === "users" ? [] : "";
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
        ".chat-open-send__field"
    ) as HTMLInputElement;
    if (messageInput) {
        const message = {
            content: messageInput.value,
            type: "message",
        };
        socket.send(JSON.stringify(message));
        messageInput.value = "";
        await chatController.getAllChats();
        router.go("/open-messenger");
    }
};

const getOldMessages = (socket: WebSocket) => {
    socket.addEventListener("open", () => {
        socket.send(
            JSON.stringify({
                content: "0",
                type: "get old",
            })
        );
    });
};

const handleMessages = (message: Dictionary | Dictionary[]) => {
    const isMessagesArray = message instanceof Array;
    const messagesContainer = document.querySelector(".chat-open__messages-container");
    const chatContainer = document.querySelector(".chat-open__container");

    const addMessage = (elem: Dictionary) => {
        if (messagesContainer && elem.content) {
            const myMessage = elem.user_id == localStorage.getItem("myID");
            const dateObject = new Date(elem.time);
            const options: Intl.DateTimeFormatOptions = {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            };
            const time = new Intl.DateTimeFormat("ru-RU", options).format(dateObject);
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
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
};

const getTemplate = () => {
    const template = Handlebars.compile(openChatTemplate);

    const wsParamsString = localStorage.getItem("wsParams");
    let wsParams;
    if (wsParamsString) {
        wsParams = JSON.parse(wsParamsString);
    }

    const socket = createChatWebSocket(wsParams, handleMessages);

    getOldMessages(socket);

    const currentChatId = localStorage.getItem("currentChat");

    const addUsersToChat = async (chatId: string) => {
        const input = document.querySelector(".new-user-input") as HTMLInputElement;
        if (input) {
            const usersArray = input.value.split(",");
            const users = usersArray.map((s) => s.trim());
            try {
                await chatController.addUser({users, chatId: parseInt(chatId, 10)});
                store.setStateAndPersist({usersInChats: [{id: chatId, users}]});
                closeModal("add-user-modal", ".new-user-input");
                router.go("/open-messenger");
            }
            catch (e) {
                console.log("Пользователь не найден")
            }
        }
    };

    const removeUsersFromChat = async (chatId: string) => {
        const input = document.querySelector(
            ".remove-user-input"
        ) as HTMLInputElement;
        if (input) {
            const users = input.value.split(",");
            await chatController.removeUser({users, chatId: parseInt(chatId, 10)});
            closeModal("remove-user-modal", ".remove-user-input");
            router.go("/open-messenger");
        }
    };

    const addUserInput = new Input({
        name: "title",
        label: "Введите ID пользователя",
        type: "text",
        required: true,
        dataType: "text",
        inputClassName: "new-user-input",
    });

    const backLink = new Btn(
        {
            btnType: "button",
            linkText: "Отмена",
            isLink: true,
        },
        {
            click: () => {
                closeModal("add-user-modal", ".add-user-input");
                closeModal("remove-user-modal", ".remove-user-input");
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
        name: "title",
        label: "Введите ID пользователя",
        type: "text",
        required: true,
        dataType: "text",
        inputClassName: "remove-user-input",
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
                await addUsersToChat(currentChatId || "");
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
                await removeUsersFromChat(currentChatId || "");
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
            name: "message",
            type: "text",
            dataType: "message",
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
                if (["Enter", "NumpadEnter"].includes(event.key)) {
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
            btnClassName: "chat-open-send__btn",
            btnType: "button",
        },
        {
            click: () => {
                sendMessage(socket);
            },
        }
    );

    const newUser = new Btn (
        {
            btnClassName: "chat-open__popover-item",
            btnType: "button",
            isLink: true,
            icon: addUserIcon,
            linkText: "Добавить пользователя",
        },
        {
            click: async () => {
                await showModal("add-user-modal");
            },
        }
    );

    const removeUser = new Btn (
        {
            btnClassName: "chat-open__popover-item",
            btnType: "button",
            isLink: true,
            icon: deleteUserIcon,
            linkText: "Удалить пользователя",
        },
        {
            click: async () => {
                await showModal("remove-user-modal");
            },
        }
    );

    const userActionsPopoverTrigger = new Btn (
        {
            btnClassName: "chat-open-actions__btn",
            btnType: "button",
            isLink: true,
            icon: dot,
        },
        {
            click: async () => {
                await showModal("user-actions-popover");
            },
        }
    )

    const context = {
        readIcon,
        addIcon,
        arrowIcon,
        addUserModal: addUserModal.transformToString(),
        removeUserModal: removeUserModal.transformToString(),
        sendButton: sendButton.transformToString(),
        chatTitle: getDataFromChat(currentChatId || "", "chats", "title"),
        message: message.transformToString(),
        users: getDataFromChat(currentChatId || "", "usersInChats", "users"),
        avatarIcon: avatarIconBase64,
        newUser: newUser.transformToString(),
        removeUser: removeUser.transformToString(),
        userActionsPopoverTrigger: userActionsPopoverTrigger.transformToString(),
    };


    return template(context);
}

export class OpenChat extends Block {
    constructor(context = {}, events = {}) {
        super(
            "div",
            {
                context: {
                    ...context,
                },
                template: getTemplate(),
                events,
            },
            "chat-open"
        );
    }
}
