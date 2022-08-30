import { nanoid } from 'nanoid';
import inputTemplate from './input.tmpl';
import { Block } from '../../utils/block';
import './input.scss';

export type TInput = {
    type: string;
    errorMessage?: string;
    label: string;
    name: string;
    required?: boolean;
    value?: string | number;
    disabled?: boolean;
    placeholder?: string;
};

export class Input extends Block {
    constructor(context: TInput, events: Object = {}) {
        super('div', {
            context: {
                ...context,
                disabledInput: context.disabled,
                id: nanoid(6),
            },
            template: inputTemplate,
            events,
        });
    }
}
