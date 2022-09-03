import * as Handlebars from "handlebars";
import overviewProfileTemplate from "./overviewProfile.tmpl";
import {ProfileAvatar} from "../../../components/profileAvatar";
import { Input } from "../../../components/input";
import "./profile-overview.scss";
import uploadPhoto from "../../../assets/icons/upload-photo.svg";
import {nanoid} from "nanoid";

export function overviewProfile() {
    const template = Handlebars.compile(overviewProfileTemplate);

    const inputs = [
        new Input({
            value: "pochta@yandex.ru",
            name: "email",
            label: "Почта",
            type: "text",
            required: true,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: "ivanivanov",
            name: "login",
            label: "Логин",
            type: "text",
            required: true,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: "Иван",
            name: "name",
            label: "Имя",
            type: "text",
            required: false,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: "Иванов",
            name: "lastName",
            label: "Фамилия",
            type: "text",
            required: false,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: "Иван",
            name: "nickname",
            label: "Имя в чате",
            type: "text",
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: "+7(909)9673030",
            name: "phone",
            label: "Телефон",
            type: "text",
            required: false,
            disabled: true,
            isProfileInput: true,
        }),
    ];

    const profileAvatar = new ProfileAvatar ({
        uploadAvatarImage: uploadPhoto
    });

    const context = {
        inputs: inputs.map((input) => input.transformToString()),
        userName: "Иван",
        changeData: "Изменить данные",
        changePassword: "Изменить пароль",
        back: "Выйти",
        profileAvatar: profileAvatar.transformToString(),
        id: nanoid()
    };

    return template(context);
}

