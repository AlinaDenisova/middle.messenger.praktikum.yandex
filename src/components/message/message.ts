import messageTemplate from './message.tmpl';
import { Block } from '../../utils/block';
import './message.scss';

export type TMessage = {
    myMessage: boolean;
    image?: string;
    read?: boolean;
    text?: string;
    time: string;
};

export class Message extends Block {
    constructor(context: TMessage, events = {}) {
        super('div', {
            context: {
                ...context,
            },
            template: messageTemplate,
            events,
        });
    }
}