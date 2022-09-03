import * as Handlebars from "handlebars";
import editProfileTemplate from "./editProfile.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import { Dictionary } from "../../../utils/block";
import "./profile-edit.scss";
import {ProfileAvatar} from "../../../components/profileAvatar";
import uploadPhoto from "../../../assets/icons/upload-photo.svg";
import {nanoid} from "nanoid";

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
            }
        )
    ]

    const button = new Btn({
        btnText: "Сохранить",
        btnType: "submit",
        btnClassName: "profile-edit"
    });

    const profileAvatar = new ProfileAvatar ({
        uploadAvatarImage: uploadPhoto
    });


    const context = {
        inputs: inputs.map((input: Dictionary) => input.transformToString()),
        button: button.transformToString(),
        profileAvatar: profileAvatar.transformToString(),
        id: nanoid()
    };

    return template(context);
}
