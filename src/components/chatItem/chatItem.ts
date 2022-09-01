import chatItemTemplate from './chatItem.tmpl';
import { Block } from '../../utils/block';
import './chatItem.scss';

export type TChatItem = {
    avatar?: string;
    name: string;
    message: string;
    time: string;
    currentChat: boolean;
};

export class ChatItem extends Block {
    constructor(context: TChatItem, events = {}) {
        super('div', {
            context: {
                ...context,
            },
            template: chatItemTemplate,
            events,
        });
    }
}
