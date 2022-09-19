import * as Handlebars from "handlebars";
import chatTemplate from "./chat.tmpl";
import { ChatItem } from "../../components/chatItem";
import { OpenChat } from "./openChat";
import { SelectChat } from "./selectChat";
import { Input } from "../../components/input";
import "./chat.scss";
import { Block } from "../../utils/block";

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

    const chatItems = [
        new ChatItem(
            {
                name: "Андрей",
                message: "Изображение",
                time: "10:49",
                currentChat: false
            }
        ),
        new ChatItem(
            {
                name: "Киноклуб",
                message: "Вы: стикер",
                time: "12:00",
                currentChat: false
            }
        ),
        new ChatItem(
            {
                name: "Илья",
                message: "Друзья, у меня для вас особенный выпуск новостей!",
                time: "15:12",
                currentChat: false
            }
        ),
        new ChatItem(
            {
                name: "Вадим",
                message: "Вы: Круто!",
                time: "Пт",
                currentChat: true
            }
        ),
        new ChatItem(
            {
                name: "тет-а-теты",
                message: "И Human Interface Guidelines и Material Design рекомендуют",
                time: "Пт",
                currentChat: false
            }
        ),
        new ChatItem(
            {
                name: "1, 2, 3",
                message: "Миллионы россиян ежедневно проводят десятки часов свое",
                time: "Пн",
                currentChat: false
            }
        ),
        new ChatItem(
            {
                name: "Design Destroyer",
                message: "В 2008 году художник Jon Rafman начал собирать",
                time: "Пн",
                currentChat: false
            }
        ),
        new ChatItem(
            {
                name: "Day",
                message: "Так увлёкся работой по курсу, что совсем забыл его анонсировать",
                time: "1 Мая 2020",
                currentChat: false
            }
        ),
        new ChatItem(
            {
                name: "Стас Рогозин",
                message: "Можно или сегодня или завтра вечером",
                time: "12 Апр 2020",
                currentChat: false
            }
        ),
    ];

    const context = {
        chatView,
        searchInput: searchInput.transformToString(),
        chatItems: chatItems.map((chatItem) => chatItem.transformToString()),
    }

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
}
