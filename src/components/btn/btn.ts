import btnTemplate from "./btn.tmpl";
import linkTemplate from "./link.tmpl";
import { Block } from "../../utils";
import { isClassDefined } from "../../utils";
import "./btn.scss";

export type TBtn = {
    btnText?: string;
    btnClassName?: string;
    btnType: string,
    isLink?: boolean;
    linkText?: string;
    icon?: string;
    linkIconWrapperClassName?: string;
    linkIconClassName?: string;
    linkAltText?: string;
};

const getClassName = (context: TBtn): string => {
    const className = context.isLink ? "btn-link" : "btn";
    return `${className} ${isClassDefined(context.btnClassName)}`;
};

export class Btn extends Block {
    constructor(context: TBtn, events?: { click: (event: Event) => void }) {
        super("div", {
            context: {
                ...context,
                btnClassName: getClassName(context),
            },
            template: context.isLink ? linkTemplate : btnTemplate,
            events,
        });
    }
}