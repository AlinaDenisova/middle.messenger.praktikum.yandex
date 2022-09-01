import popoverItemTemplate from './popoverItem.tmpl';
import { Block } from '../../utils/block';
import './popover-item.scss';

export type TPopoverItem = {
    img: string;
    imgDescr: string;
    text: string;
};

export class PopoverItem extends Block {
    constructor(context: TPopoverItem, events = {}) {
        super('div', {
            context: {
                ...context,
            },
            template: popoverItemTemplate,
            events,
        });
    }
}
