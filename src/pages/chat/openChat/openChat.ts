import * as Handlebars from "handlebars";
import openChatTemplate from "./openChat.tmpl";
// import { Input } from "../../../components/input";
// import { Message } from "../../../components/message";
// import { Modal } from "../../../components/modal";
import "./chat-open.scss";
// import { PopoverItem } from "../../../components/popoverItem";
// import { Dictionary } from "../../../utils/block";
import arrowIcon from "../../../assets/icons/arrow-back.svg";
import addIcon from "../../../assets/icons/add.svg";
// import addFileIcon from "../../../assets/icons/add-file.svg";
// import addLocationIcon from "../../../assets/icons/add-location.svg";
// import addPhotoIcon from "../../../assets/icons/add-photo.svg";
// import deleteUserIcon from "../../../assets/icons/delete-user.svg";
// import addUserIcon from "../../../assets/icons/add-user.svg";
import readIcon from "../../../assets/icons/read.svg";
// import { openModal, showPopover, checkAndCollectDataFromInput } from "../../../utils";
// import { PopoverHandler } from "../../../components/popoverHandler";
// import { Popover } from "../../../components/popover";
import { Block } from "../../../utils/block"

const getTemplate = () => {
    const template = Handlebars.compile(openChatTemplate);

    // const messageInput = new Input(
    //     {
    //         name: "message",
    //         type: "text",
    //         inputClassName: "chat-open-send__field",
    //         wrapperClassName: "chat-open-send__field-wrapper",
    //         placeholder: "Сообщение",
    //     },
    //     {
    //         blur: (event: Event) => {
    //             checkAndCollectDataFromInput(event);
    //         },
    //     }
    // );
    //
    // const messages1 = new Message({
    //     myMessage: false,
    //     text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — ик слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали толькокассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всегоих было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
    //     time: "11:56",
    // });
    //
    // const messages2 = new Message({
    //     myMessage: false,
    //     image: "",
    //     time: "11:56",
    // });
    //
    // const messages3 = new Message({
    //     myMessage: true,
    //     read: true,
    //     text: "Круто!",
    //     time: "12:00",
    //     readIcon,
    // });
    //
    // const popoverItemsArr1 = [
    //     new PopoverItem(
    //         {
    //             img: addUserIcon,
    //             imgDescr: "Добавить пользователя",
    //             text: "Добавить пользователя",
    //             className: 'modal-trigger',
    //             id: nanoid(6),
    //             dataModal: "addUser-modal"
    //         },
    //     {
    //             click: (event: Event) => {
    //                 openModal({ event })
    //             },
    //         }
    //     ),
    //
    //     new PopoverItem(
    //         {
    //             img: deleteUserIcon,
    //             imgDescr: "Удалить пользователя",
    //             text: "Удалить пользователя",
    //             className: 'modal-trigger',
    //             id: nanoid(6),
    //             dataModal: "deleteUser-modal"
    //         },
    //         {
    //             click: (event: Event) => {
    //                 openModal({ event })
    //             },
    //         }
    //     )
    // ];
    //
    // const popover1 = new Popover({
    //     popoverItems: popoverItemsArr1.map((popoverItem: Dictionary) => popoverItem.transformToString()),
    //     className: "popover--top-right"
    // })
    //
    // const popoverItemsArr2 = [
    //     new PopoverItem(
    //         {
    //             img: addPhotoIcon,
    //             imgDescr: "Прикрепить фото или видео",
    //             text: "Фото или Видео",
    //             id: nanoid(6),
    //         }
    //     ),
    //
    //     new PopoverItem(
    //         {
    //             img: addFileIcon,
    //             imgDescr: "Прикрепить файл",
    //             text: "Файл",
    //             id: nanoid(6),
    //         }
    //     ),
    //
    //     new PopoverItem (
    //         {
    //             img: addLocationIcon,
    //             imgDescr: "Прикрепить локацию",
    //             text: "Локация",
    //             id: nanoid(6),
    //         }
    //     )
    // ];
    //
    // const popover2 = new Popover({
    //     popoverItems: popoverItemsArr2.map((popoverItem: Dictionary) => popoverItem.transformToString()),
    //     className: "popover--bottom-left"
    // })
    //
    // const modals = [
    //     new Modal (
    //         {
    //             id: "deleteUser-modal",
    //             titleText: "Удалить пользователя",
    //             labelText: "ID",
    //             inputId: "deleteUserField",
    //             required: false,
    //             inputType: "text",
    //             buttonText: "Удалить",
    //             linkHref: "javascript:void(0)",
    //             linkText: "Отмена",
    //         }
    //     ),
    //
    //     new Modal (
    //         {
    //             id: "addUser-modal",
    //             titleText: "Добавить пользователя",
    //             labelText: "ID",
    //             inputId: "addUserInput",
    //             required: false,
    //             inputType: "text",
    //             buttonText: "Добавить",
    //             linkHref: "javascript:void(0)",
    //             linkText: "Отмена",
    //         }
    //     )
    // ]
    //
    // const popoverHandler1 = new PopoverHandler({
    //      classNameBtn: "chat-open-actions__btn",
    //      classNameSpan: "chat-open-actions__dot",
    //      id: nanoid(6),
    // },
    //     {
    //         click: (event: Event) => {
    //             showPopover({ event })
    //         },
    //     }
    // );
    //
    // const popoverHandler2 = new PopoverHandler({
    //      classNameBtn: "chat-open-send__attachment",
    //      classNameImg: "chat-open-send__attachment-img",
    //      descrImg: "Прикрепить вложение",
    //      srcImg: addIcon,
    //      id: nanoid(6),
    // },
    //     {
    //         click: (event: Event) => {
    //             showPopover({ event })
    //         },
    //     }
    // );

    const context = {
        date: "21 марта",
        userName: "Вадим",
        readIcon,
        addIcon,
        arrowIcon,
        // messageInput: messageInput.transformToString(),
        // messages: [messages1.transformToString(), messages2.transformToString(),messages3.transformToString()],
        // popover1: popover1.transformToString(),
        // popover2: popover2.transformToString(),
        // modals: modals.map((modal: Dictionary) => modal.transformToString()),
        // popoverHandler1: popoverHandler1.transformToString(),
        // popoverHandler2: popoverHandler2.transformToString(),
    };


    return template(context);
}

export class OpenChat extends Block {
    constructor(context = {}, events = {}) {
        super(
            'div',
            {
                context: {
                    ...context,
                },
                template: getTemplate(),
                events,
            },
        );
    }
}
