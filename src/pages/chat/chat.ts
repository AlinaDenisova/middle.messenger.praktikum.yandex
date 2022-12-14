import * as Handlebars from "handlebars";
import chatTemplate from "./chat.tmpl";
import { OpenChat } from "./openChat";
import { SelectChat } from "./selectChat";
import { Input } from "../../components/input";
import {Btn} from "../../components/btn";
import "./chat.scss";
import { Block } from "../../utils";
import router from "../../router";
import { store } from "../../store";
import { LoginController, ChatController, IChatData } from "../../controllers";
import { Modal } from "../../components/modal"
import { Form } from "../../components/form";
import chatItemTemplate from "./chatItem.tmpl";
import { avatarIconBase64 } from "../../utils";

const loginController = new LoginController();
const chatController = new ChatController();

export const showModal = async (modalId: string) => {
    const modal = document.querySelector(`.modal[data-id = "${modalId}"]`);
    const popover = document.querySelector(`.chat-open__popover[data-id = "${modalId}"]`);
    const overlay = document.querySelector(".overlay");
    if (modal?.classList.contains("hidden")) {
        modal?.classList.remove("hidden");
        overlay?.classList.remove("hidden");
    }
    if (popover?.classList.contains("hidden")) {
        popover?.classList.remove("hidden");
    }
};

export const closeModal = (modalId: string, inputClassName: string) => {
    const input = document.querySelector(inputClassName) as HTMLInputElement;
    const modal = document.querySelector(`.modal[data-id = "${modalId}"]`);
    const overlay = document.querySelector(".overlay");
    if (input) {
        input.value = "";
    }
    modal?.classList.add("hidden");
    overlay?.classList.add("hidden");
};

const createNewChat = async () => {
    const input = document.querySelector(".new-chat-input") as HTMLInputElement;
    if (input) {
        const title = input.value;
        await chatController.createChat({title});
        closeModal("new-chat-modal", ".new-chat-input");
        router.go("/messenger");
    }
};

(function() {
    window.onclick = function (event: MouseEvent) {
        const target = event.target as HTMLElement;
        var popover = document.querySelector(".chat-open__popover");

        if (target.contains(popover) && event.target !== popover) {
            popover?.classList.add("hidden");
        }
    }
}());


const getTemplate = (isChatOpen?: boolean) => {
    const template = Handlebars.compile(chatTemplate);
    const elemTemplate = Handlebars.compile(chatItemTemplate);

    const chatView = isChatOpen
        ? new OpenChat().transformToString()
        : new SelectChat().transformToString();

    const searchInput = new Input({
        placeholder: "??????????",
        name: "search",
        type: "text",
        inputClassName: "chat-sidebar__search-input"
    });

    const profileLink = new Btn (
        {
            btnType: "button",
            isLink: true,
            btnClassName: "chat-sidebar__link",
            linkText: "?????????????? >",
        },
        {
            click: async () => {
                router.go("/settings");
            },
        }
    );

    const newChat = new Btn (
        {
            btnType: "button",
            btnText: "?????????? ??????",
            btnClassName: "chat-sidebar",
        },
        {
            click: async () => {
                await showModal("new-chat-modal");
            },
        }
    );

    const newChatInput = new Input({
        name: "title",
        label: "???????????????? ???????????? ????????",
        type: "text",
        required: true,
        dataType: "text",
        inputClassName: "new-chat-input",
    });

    const createNewChatBtn = new Btn(
        {
            btnType: "submit",
            btnText: "?????????????? ??????",
            btnClassName: ""
        }
    )

    const backLink = new Btn(
        {
            btnType: "button",
            linkText: "????????????",
            isLink: true,
        },
        {
            click: () => {
                closeModal("new-chat-modal", ".new-chat-input");
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
            titleText: "???????????????? ???????????? ????????",
            form: chatForm.transformToString(),
            backLink: backLink.transformToString()
        }
    );

    const item = localStorage.getItem("chats");
    let chatsData;
    if (item) {
        chatsData = JSON.parse(item);
        chatsData = chatsData.map((el: IChatData) => {
            const { unread_count } = el || {};
            const { content, time } = el.last_message || {};
            let messageTime = null;
            if (time) {
                const dateObject = new Date(time);
                messageTime = dateObject.getHours() + ":" + dateObject.getMinutes();
            }
            const elemContext = {
                ...el,
                avatar: el.avatar
                    ? `https://ya-praktikum.tech/api/v2/resources/${el.avatar}`
                    : avatarIconBase64,
                last_message: content,
                unread_count,
                time: messageTime,
            };

            const openSelectedChat = async () => {
                const { id } = elemContext;
                store.setStateAndPersist({ currentChat: id });

                const userData = localStorage.getItem("user");
                if (userData) {
                    await chatController.connectToChat(JSON.parse(userData).id, id);
                }
                router.go("/open-messenger");
            };

            const elem = new Btn(
                {
                    btnType: "button",
                    isLink: true,
                    btnClassName: "chat__link",
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
        super("div", {
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
