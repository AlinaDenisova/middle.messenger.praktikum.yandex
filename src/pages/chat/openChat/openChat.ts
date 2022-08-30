import * as Handlebars from 'handlebars';
import openChatTemplate from './openChat.tmpl';
import { Input } from '../../../components/input';
import { Message } from '../../../components/message';
import './chat-open.scss';

export function openChat() {
    const template = Handlebars.compile(openChatTemplate);

    const message = new Input(
        {
            label: 'Сообщение',
            name: 'message',
            type: 'text',
        }
    );

    const messages1 = new Message({
        myMessage: false,
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — ик слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали толькокассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всегоих было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        time: '11:56',
    });

    const messages2 = new Message({
        myMessage: false,
        image: '',
        time: '11:56',
    });

    const messages3 = new Message({
        myMessage: true,
        read: true,
        text: 'Круто!',
        time: '12:00',
    });

    const context = {
        date: '21 марта',
        userName: 'Вадим',
        message: message.transformToString(),
        messages: [messages1.transformToString(), messages2.transformToString(),messages3.transformToString()]
    };

    return template(context);
}
