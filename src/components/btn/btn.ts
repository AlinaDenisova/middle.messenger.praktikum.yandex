import buttonTemplate from './btn.tmpl';
import { Block } from '../../utils/block';
import { isClassDefined } from '../../utils';
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
                btnClassName: `${isClassDefined(context.btnClassName)}`,
            },
            template: buttonTemplate,
            events,
        });
    }
}