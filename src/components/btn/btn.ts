import btnTemplate from "./btn.tmpl";
import { Block } from "../../utils/block";
import "./btn.scss";

export type TBtn = {
    btnText: string;
    btnClassName?: string;
    btnType: string,
};

export class Btn extends Block {
    constructor(context: TBtn, events?: { click: (event: Event) => void }) {
        super("div", {
            context: {
                ...context,
            },
            template: btnTemplate,
            events,
        });
    }
}