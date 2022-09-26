import chatItemTemplate from "./chatItem.tmpl";
import { Block } from "../../utils";
import "./chatItem.scss";

export type TChatItem = {
    avatar?: string;
    name: string;
    message: string;
    time: string;
    currentChat: boolean;
    counter?: string;
};

export class ChatItem extends Block {
    constructor(context: TChatItem, events?: { click: (event: Event) => void }) {
        super("div", {
            context: {
                ...context,
            },
            template: chatItemTemplate,
            events,
        });
    }
}
