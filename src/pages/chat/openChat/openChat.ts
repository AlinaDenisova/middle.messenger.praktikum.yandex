import * as Handlebars from 'handlebars';
import openChatTemplate from './openChat.tmpl';
import { Input } from '../../../components/input';
import { Message } from '../../../components/message';
import './chat-open.scss';
import {Popover} from "../../../components/popover";
import {PopoverItem} from "../../../components/popoverItem";
import popoverTemplate from "../../../components/popover/popover.tmpl";
import arrowIcon from "../../../assets/icons/arrow-back.svg";
import addIcon from "../../../assets/icons/add.svg";
import addFileIcon from "../../../assets/icons/add-file.svg";
import addLocationIcon from "../../../assets/icons/add-location.svg";
import addPhotoIcon from "../../../assets/icons/add-photo.svg";
import deleteUserIcon from "../../../assets/icons/delete-user.svg";
import addUserIcon from "../../../assets/icons/add-user.svg";
import readIcon from "../../../assets/icons/read.svg";

export function openChat() {
    const template = Handlebars.compile(openChatTemplate);
    const templatePopover = Handlebars.compile(popoverTemplate);

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
        readIcon,
    });

    const popoverItemsArr1 = [
        new PopoverItem(
            {
                img: addUserIcon,
                imgDescr: 'Добавить пользователя',
                text: 'Добавить пользователя',
            }
        ),

        new PopoverItem(
            {
                img: deleteUserIcon,
                imgDescr: 'Удалить пользователя',
                text: 'Удалить пользователя',
            }
        )
    ];

    const popoverItemsArr2 = [
        new PopoverItem(
            {
                img: addPhotoIcon,
                imgDescr: 'Прикрепить фото или видео',
                text: 'Фото или Видео',
            }
        ),

        new PopoverItem(
            {
                img: addFileIcon,
                imgDescr: 'Прикрепить файл',
                text: 'Файл',
            }
        ),

        new PopoverItem (
            {
                img: addLocationIcon,
                imgDescr: 'Прикрепить локацию',
                text: 'Локация',
            }
        )
    ];

    const context = {
        date: '21 марта',
        userName: 'Вадим',
        readIcon,
        addIcon,
        arrowIcon,
        message: message.transformToString(),
        messages: [messages1.transformToString(), messages2.transformToString(),messages3.transformToString()],
        popoverItems1: [popoverItemsArr1.map((popoverItem) => popoverItem.transformToString())],
        popoverItems2: [popoverItemsArr2.map((popoverItem) => popoverItem.transformToString())]
    };

    const popover1 = new Popover(
        {
            children: {
                popoverItems: popoverItemsArr1
            },
            popoverClassName: 'top-right',
            content: templatePopover(context.popoverItems1),
        }
    );

    const popover2 = new Popover(
        {
            children: {
                popoverItems: popoverItemsArr2
            },
            popoverClassName: 'bottom-left',
            content: templatePopover(context.popoverItems2),
        }
    );

    return template(context);

    return popover1.transformToString();
    return popover2.transformToString();
}
