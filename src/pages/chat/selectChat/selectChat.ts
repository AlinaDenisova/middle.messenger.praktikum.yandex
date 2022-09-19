import * as Handlebars from "handlebars";
import selectChatTemplate from "./selectChat.tmpl";
import { Block } from "../../../utils/block";
import "./chat-select.scss";

const getTemplate = () => {
    const template = Handlebars.compile(selectChatTemplate);

    const context = {};

    return template(context);
};

export class SelectChat extends Block {
    constructor(context = {}, events: Record<string, () => void>) {
        super(
            'div',
            {
                context: {
                    ...context,
                },
                template: getTemplate(),
                events,
            }
        );
    }
}
