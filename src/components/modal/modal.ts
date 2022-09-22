import modalTemplate from "./modal.tmpl";
import { Block } from "../../utils/block";
import "./modal.scss";

export type TModal = {
    dataId: string,
    titleText: string;
    form: string;
    backLink: string;
};

export class Modal extends Block {
    constructor(context: TModal, events?: { click: (event: Event) => void }) {
        super("div", {
            context: {
                ...context,
            },
            template: modalTemplate,
            events,
        });
    }
}
