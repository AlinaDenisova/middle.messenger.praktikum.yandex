import * as Handlebars from "handlebars";
import editProfileTemplate from "./editProfile.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import { Dictionary } from "../../../utils/block";
import "./profile-edit.scss";
import { ProfileAvatar } from "../../../components/profileAvatar";
import uploadPhoto from "../../../assets/icons/upload-photo.svg";
import { Modal } from "../../../components/modal";
import { checkAndCollectData, validation } from '../../../utils';
import { Form } from "../../../components/form";
import { nanoid } from "nanoid";
import { UploadAvatar } from "../../../components/uploadAvatar";
import { openModal } from "../../../utils/";

export function editProfile() {
    const template = Handlebars.compile(editProfileTemplate);

    const inputs = [
        new Input(
            {
                value: "pochta@yandex.ru",
                name: "email",
                label: "Почта",
                type: "text",
                required: true,
                disabled: false,
                errorMessage:
                    "Адрес электронной почты содержит ошибки",
                isProfileInput: true,
            },
            {
                blur: (event: Event) => {
                    validation({ event });
                },
            }
        ),
        new Input(
            {
                value: "ivanivanov",
                name: "login",
                label: "Логин",
                type: "text",
                required: true,
                disabled: false,
                errorMessage:
                    "Длина логина 3-20 символов, должен быть написан латиницей",
                isProfileInput: true,
            },
            {
                blur: (event: Event) => {
                    validation({ event });
                },
            }
        ),
        new Input(
            {
                value: "Иван",
                name: "name",
                label: "Имя",
                type: "text",
                required: false,
                disabled: false,
                errorMessage:
                    "Ввведите имя с заглавной буквы без цифр и символов",
                isProfileInput: true,
            },
            {
                blur: (event: Event) => {
                    validation({ event });
                },
            }
        ),
        new Input(
            {
                value: "Иванов",
                name: "lastName",
                label: "Фамилия",
                type: "text",
                required: false,
                disabled: false,
                errorMessage:
                    "Ввведите фамилию с заглавной буквы без цифр и символов",
                isProfileInput: true,
            },
            {
                blur: (event: Event) => {
                    validation({ event });
                },
            }
        ),
        new Input(
            {
                value: "Иван",
                name: "nickname",
                label: "Имя в чате",
                type: "text",
                required: false,
                disabled: false,
                errorMessage:
                    "Длина ника 3-20 символов, должен быть написан латиницей",
                isProfileInput: true,
            },
            {
                blur: (event: Event) => {
                    validation({ event });
                },
            }
        ),
        new Input(
            {
                value: "+7(909)9673030",
                name: "phone",
                label: "Телефон",
                type: "text",
                required: false,
                disabled: false,
                errorMessage:
                    "Введите номер в международном формате, например: +7..",
                isProfileInput: true,
            },
            {
                blur: (event: Event) => {
                    validation({ event });
                },
            }
        )
    ]

    const button = new Btn({
        btnText: "Сохранить",
        btnType: "submit",
        btnClassName: "profile-edit",
    },
        );

    const profileAvatar = new ProfileAvatar ({
        uploadAvatarImage: uploadPhoto
    });

    const modal = new Modal (
        {
            id: "uploadAvatar-modal",
            titleText: "Загрузите файл",
            labelText: "Выбрать файл на устройстве",
            linkText: "Отмена",
            linkHref: "javascript:void(0)",
            inputId: "uploadAvatarField",
            required: false,
            inputType: "file",
            inputClassName: "modal-input--upload-avatar",
            labelClassName: "modal-input__label--upload-avatar",
        }
    )

    const form = new Form({
        inputs: inputs.map((input: Dictionary) => input.transformToString()),
        btn: button.transformToString(),
    }, {
        submit: (event: Event) => {
            checkAndCollectData(event, "/overviewProfile");
        },
    });

    const uploadAvatar = new UploadAvatar({
        profileAvatar: profileAvatar.transformToString(),
        id: nanoid(6),
        dataModal: 'uploadAvatar-modal'
    },
        {
        click: (event: Event) => {
            openModal({ event })
        },
    });

    const context = {
        modal: modal.transformToString(),
        userName: "Иван",
        form: form.transformToString(),
        uploadAvatar: uploadAvatar.transformToString()
    };

    return template(context);
}
