import * as Handlebars from "handlebars";
import editProfileTemplate from "./editProfile.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import { Form } from "../../../components/form";
import { Dictionary } from "../../../utils/block";
import "./profile-edit.scss";

export function editProfile(profileType: string) {
    const template = Handlebars.compile(editProfileTemplate);

    const profileInputs: Dictionary = {
        passwordInputs: [
            new Input(
                {
                    name: "password",
                    label: "Старый пароль",
                    type: "password",
                    required: true,
                    errorMessage: "Неверный пароль",
                    isProfileInput: true,
                }
            ),
            new Input(
                {
                    name: "secondPassword",
                    label: "Новый пароль",
                    type: "password",
                    required: true,
                    errorMessage:
                        "Длина пароля 8-40 символов, обязательна хотя бы одна заглавная буква и одна цифра",
                    isProfileInput: true,
                }
            ),
            new Input(
                {
                    name: "secondPassword",
                    label: "Повторите новый пароль",
                    type: "password",
                    required: true,
                    errorMessage: "Введенные пароли не совпадают",
                    isProfileInput: true,
                }
            ),
        ],

        profileInputs: [
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
                        "Логин должен быть от 3 до 20 символов, должен быть написан латиницей",
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
                        "Не допускается использование цифр или символов, первая буква заглавная",
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
                        "Не допускается использование цифр или символов, первая буква заглавная",
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
            ),
        ],
    };

    const button = new Btn({
        btnText: "Сохранить",
        btnType: "submit",
        btnClassName: "profile-edit"
    });

    const inputs = profileInputs[profileType];

    const context = {
        inputs: inputs.map((input: Dictionary) => input.transformToString()),
        button: button.transformToString(),
    };

    const form = new Form(
        {
            children: {
                inputs,
                button: button,
            },
            content: template(context),
        },
    );

    return form.transformToString();
}
