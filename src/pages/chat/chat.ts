import * as Handlebars from "handlebars";
import chatTemplate from "./chat.tmpl";
// import { ChatItem } from "../../components/chatItem";
import { OpenChat } from "./openChat";
import { SelectChat } from "./selectChat";
import { Input } from "../../components/input";
import {Btn} from "../../components/btn";
import "./chat.scss";
import { Block } from "../../utils";
import router from '../../router';
import { store } from '../../store';
import { LoginController, ChatController, IChatData } from '../../controllers';
import { Modal } from '../../components/modal'
import { Form } from '../../components/form';
import chatItemTemplate from '../../components/chatItem/chatItem.tmpl';
import { avatarIconBase64 } from '../../utils';

const loginController = new LoginController();
const chatController = new ChatController();

export const showModal = async (modalId: string) => {
    const modal = document.querySelector(`.modal[data-id = "${modalId}"]`);
    if (modal?.classList.contains('hidden')) {
        modal?.classList.remove('hidden');
    }
};

export const closeModal = (modalId: string, inputClassName: string) => {
    const input = document.querySelector(inputClassName) as HTMLInputElement;
    const modal = document.querySelector(`.modal[data-id = "${modalId}"]`);
    if (input) {
        input.value = '';
    }
    modal?.classList.add('hidden');
};

const createNewChat = async () => {
    const input = document.querySelector('.new-chat-input') as HTMLInputElement;
    const title = input.value;
    await chatController.createChat({ title });
    closeModal('new-chat-modal', '.new-chat-input');
    router.go('/messenger');
};


const getTemplate = (isChatOpen?: boolean) => {
    const template = Handlebars.compile(chatTemplate);
    const elemTemplate = Handlebars.compile(chatItemTemplate);

    const chatView = isChatOpen
        ? new OpenChat().transformToString()
        : new SelectChat().transformToString();

    const searchInput = new Input({
        placeholder: "Поиск",
        name: "search",
        type: "text",
        inputClassName: 'chat-sidebar__search-input'
    });

    const profileLink = new Btn (
        {
            btnType: 'button',
            isLink: true,
            btnClassName: 'chat-sidebar__link',
            linkText: 'Профиль >',
        },
        {
            click: async () => {
                router.go('/settings');
            },
        }
    );

    const newChat = new Btn (
        {
            btnType: 'button',
            btnText: 'Новый чат',
            btnClassName: 'chat-sidebar',
        },
        {
            click: async () => {
                await showModal('new-chat-modal');
            },
        }
    );

    const newChatInput = new Input({
        name: 'title',
        label: 'Название нового чата',
        type: 'text',
        required: true,
        dataType: 'text',
        inputClassName: 'new-chat-input',
    });

    const createNewChatBtn = new Btn(
        {
            btnType: "submit",
            btnText: "Создать чат",
            btnClassName: ""
        }
    )

    const backLink = new Btn(
        {
            btnType: 'button',
            linkText: 'Отмена',
            isLink: true,
        },
        {
            click: () => {
                closeModal('new-chat-modal', '.new-chat-input');
            },
        }
    );

    const chatForm = new Form(
        {
            input: newChatInput.transformToString(),
            btn: createNewChatBtn.transformToString(),
        },
        {
            submit: async () => {
                await createNewChat();
            },
        }
    );

    const newChatModal = new Modal (
        {
            dataId: "new-chat-modal",
            titleText: "Создание нового чата",
            form: chatForm.transformToString(),
            backLink: backLink.transformToString()
            // labelText: "ID",
            // inputId: "newChatInput",
            // required: false,
            // inputType: "text",
            // buttonText: "Добавить",
            // linkHref: "javascript:void(0)",
            // linkText: "Отмена",
        }
    );

    const item = localStorage.getItem('chats');
    let chatsData;
    if (item) {
        console.log(item)
        chatsData = JSON.parse(item);
        chatsData = chatsData.map((el: IChatData) => {
            const { unread_count } = el || {};
            const { content } = el.last_message || {};
            let { time } = el.last_message || {};
            if (time) {
                const dateObject = new Date(time);
                time = dateObject.getHours() + ':' + dateObject.getMinutes();
            }
            const elemContext = {
                ...el,
                avatar: el.avatar
                    ? `https://ya-praktikum.tech/api/v2/resources/${el.avatar}`
                    : avatarIconBase64,
                last_message: content,
                unread_count,
                time,
            };

            const openSelectedChat = async () => {
                const { id } = elemContext;
                store.setStateAndPersist({ currentChat: id });

                const userData = localStorage.getItem('user');
                let user;
                if (userData) {
                    user = JSON.parse(userData);
                }

                if (user) {
                    await chatController.connectToChat(user.id, id);
                }
                router.go('/open-messenger');
            };

            const elem = new Btn(
                {
                    btnType: 'button',
                    isLink: true,
                    btnClassName: 'chat__link',
                    linkText: elemTemplate(elemContext),
                },
                {
                    click: async () => {
                        await openSelectedChat();
                    },
                }
            );

            return elem.transformToString();
        });
    }

    const context = {
        chatView,
        profileLink: profileLink.transformToString(),
        newChat: newChat.transformToString(),
        searchInput: searchInput.transformToString(),
        newChatModal: newChatModal.transformToString(),
        chatItems: chatsData || [],
    };

    return template(context);
}

export type TChat = {
    isChatOpen?: boolean;
    content?: string;
};

export class Chat extends Block {
    constructor(context: TChat, events: Record<string, () => void>) {
        super('div', {
            context: {
                ...context,
            },
            template: getTemplate(context.isChatOpen),
            events,
        });
    }

    componentDidMount() {
        loginController.getUser();
    }
}
