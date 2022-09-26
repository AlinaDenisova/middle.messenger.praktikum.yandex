import popoverItemTemplate from "./popoverItem.tmpl";
import { Block } from "../../utils";
import "./popover-item.scss";

export type TPopoverItem = {
    img: string;
    imgDescr: string;
    text: string;
    className?: string,
    id: string,
    dataModal?: string,
};

export class PopoverItem extends Block {
    constructor(context: TPopoverItem, events?: { click: (event: Event) => void }) {
        super("div", {
            context: {
                ...context,
            },
            template: popoverItemTemplate,
            events,
        });
    }
}
