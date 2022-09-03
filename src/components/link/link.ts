import linkTemplate from "./link.tmpl";
import { Block } from "../../utils/block";
import "./link.scss";
import {isClassDefined} from "../../utils";

export type TBtn = {
    linkHref: string;
    linkText: string;
    linkClassName?: string;
};

export class Link extends Block {
    constructor(context: TBtn, events = {}) {
        super("a", {
            context: {
                ...context,
                linkClassName: `${isClassDefined(context.linkClassName)}`,
            },
            template: linkTemplate,
            events,
        });
    }
}