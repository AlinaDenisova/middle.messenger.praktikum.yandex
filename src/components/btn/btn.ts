import btnTemplate from "./btn.tmpl";
import { Block } from "../../utils/block";
import { isClassDefined } from "../../utils";
import "./btn.scss";

export type TBtn = {
    btnText: string;
    btnClassName?: string;
    btnType: string,
};

export class Btn extends Block {
    constructor(context: TBtn, events: Object = {}) {
        super("div", {
            context: {
                ...context,
                btnClassName: `${isClassDefined(context.btnClassName)}`,
            },
            template: btnTemplate,
            events,
        });
    }
}