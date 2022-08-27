import buttonTemplate from './btn.tmpl';
import { Block } from '../../utils/block';
import './btn.scss';

export type TBtn = {
    btnText: string;
    btnClassName?: string;
};

export class Btn extends Block {
    constructor(context: TBtn, events = {}) {
        super('div', {
            context: {
                ...context,
                btnClassName: `${isClassName(context.className)}`,
            },
            template: buttonTemplate,
            events,
        });
    }
}