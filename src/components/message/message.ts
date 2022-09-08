import messageTemplate from "./message.tmpl";
import { Block } from "../../utils/block";
import "./message.scss";

export type TMessage = {
    myMessage: boolean;
    image?: string;
    read?: boolean;
    text?: string;
    time: string;
    readIcon?: any;
};

export class Message extends Block {
    constructor(context: TMessage, events: object = {}) {
        super("div", {
            context: {
                ...context,
            },
            template: messageTemplate,
            events,
        });
    }
}
