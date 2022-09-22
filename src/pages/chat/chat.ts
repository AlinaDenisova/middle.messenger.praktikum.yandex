import * as Handlebars from "handlebars";
import chatTemplate from "./chat.tmpl";
// import { ChatItem } from "../../components/chatItem";
import { OpenChat } from "./openChat";
import { SelectChat } from "./selectChat";
import { Input } from "../../components/input";
import {Btn} from "../../components/btn";
import "./chat.scss";
import { Block } from "../../utils/block";
import router from '../../router';
import { LoginController, ChatController } from '../../controllers';
import { Modal } from '../../components/modal'
import { Form } from '../../components/form';

const loginController = new LoginController();
const chatController = new ChatController();

export const showModal = async (modalId: string) => {
    const modal = document.querySelector(`.modal[data-id = "${modalId}"]`);
    console.log(modalId)
    if (modal?.classList.contains('hidden')) {
        modal?.classList.remove('hidden');
    }
};

export const closeModal = (modalId: string, inputClassName: string) => {
    const input = document.querySelector(inputClassName) as HTMLInputElement;
    const modal = document.getElementById(modalId);
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

    // const chatItems = [
    //     new ChatItem(
    //         {
    //             name: "Андрей",
    //             message: "Изображение",
    //             time: "10:49",
    //             currentChat: false
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "Киноклуб",
    //             message: "Вы: стикер",
    //             time: "12:00",
    //             currentChat: false
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "Илья",
    //             message: "Друзья, у меня для вас особенный выпуск новостей!",
    //             time: "15:12",
    //             currentChat: false
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "Вадим",
    //             message: "Вы: Круто!",
    //             time: "Пт",
    //             currentChat: true
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "тет-а-теты",
    //             message: "И Human Interface Guidelines и Material Design рекомендуют",
    //             time: "Пт",
    //             currentChat: false
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "1, 2, 3",
    //             message: "Миллионы россиян ежедневно проводят десятки часов свое",
    //             time: "Пн",
    //             currentChat: false
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "Design Destroyer",
    //             message: "В 2008 году художник Jon Rafman начал собирать",
    //             time: "Пн",
    //             currentChat: false
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "Day",
    //             message: "Так увлёкся работой по курсу, что совсем забыл его анонсировать",
    //             time: "1 Мая 2020",
    //             currentChat: false
    //         }
    //     ),
    //     new ChatItem(
    //         {
    //             name: "Стас Рогозин",
    //             message: "Можно или сегодня или завтра вечером",
    //             time: "12 Апр 2020",
    //             currentChat: false
    //         }
    //     ),
    // ];


    const context = {
        chatView,
        profileLink: profileLink.transformToString(),
        newChat: newChat.transformToString(),
        searchInput: searchInput.transformToString(),
        newChatModal: newChatModal.transformToString(),
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
