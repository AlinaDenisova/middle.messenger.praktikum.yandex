import modalTemplate from "./modal.tmpl";
import { Block } from "../../utils/block";
import "./modal.scss";

export type TModal = {
    id: string,
    titleText: string;
    labelText: string;
    inputId: string;
    required: boolean,
    inputType: string,
    errorText?: string,
    buttonText?: string,
    linkHref?: string,
    linkText?: string,
    inputClassName?: string,
    labelClassName?: string,
};

export class Modal extends Block {
    constructor(context: TModal, events = {}) {
        super("div", {
            context: {
                ...context,
            },
            template: modalTemplate,
            events,
        });
    }
}
