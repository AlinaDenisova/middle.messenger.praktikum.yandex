import * as Handlebars from "handlebars";
import overviewProfileTemplate from "./overviewProfile.tmpl";
import { Input } from "../../../components/input";
import "./profile-overview.scss";

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

    const context = {
        inputs: inputs.map((input) => input.transformToString()),
        userName: "Иван",
        changeData: "Изменить данные",
        changePassword: "Изменить пароль",
        back: "Выйти",
    };

    return template(context);
}

