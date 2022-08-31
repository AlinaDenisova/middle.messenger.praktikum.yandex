import * as Handlebars from 'handlebars';
import selectChatTemplate from './selectChat.tmpl';
import './chat-select.scss';

export function selectChat() {
    const template = Handlebars.compile(selectChatTemplate);

    const context = {};

    return template(context);
}
