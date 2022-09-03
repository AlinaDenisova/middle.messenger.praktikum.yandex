import linkTemplate from "./link.tmpl";
import { Block } from "../../utils/block";
import "./link.scss";

export type TBtn = {
    linkHref: string;
    linkText: string;
    ClassName?: string;
};

export class Link extends Block {
    constructor(context: TBtn, events = {}) {
        super("a", {
            context: {
                ...context,
            },
            template: linkTemplate,
            events,
        });
    }
}