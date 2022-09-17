import * as Handlebars from "handlebars";
import editProfilePasswordTemplate from "./editProfilePassword.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import { Dictionary } from "../../../utils/block";
import "./profile-password.scss";
import {ProfileAvatar} from "../../../components/profileAvatar";
import uploadPhoto from "../../../assets/icons/upload-photo.svg";
import {checkAndCollectData, validation} from "../../../utils";
import {Form} from "../../../components/form";

export function editProfilePassword() {
    const template = Handlebars.compile(editProfilePasswordTemplate);

    const inputs = [
            new Input({
                name: "password",
                label: "Старый пароль",
                type: "password",
                required: true,
                errorMessage: "Неверный пароль",
                isProfileInput: true,
            }, {
                blur: (event: Event) => {
                    validation({event});
                },
            }),
            new Input({
                name: "secondPassword",
                label: "Новый пароль",
                type: "password",
                required: true,
                errorMessage:
                    "Длина пароля 8-40 символов, обязательна заглавная буква и цифра",
                isProfileInput: true,
            }, {
                blur: (event: Event) => {
                    validation({event});
                },
            }),
            new Input({
                name: "secondPassword",
                label: "Повторите новый пароль",
                type: "password",
                required: true,
                errorMessage: "Введенные пароли не совпадают",
                isProfileInput: true,
            }, {
                blur: (event: Event) => {
                    validation({event});
                },
            }),
        ]

    const button = new Btn({
        btnText: "Сохранить",
        btnType: "submit",
        btnClassName: "profile-password"
    });

    const profileAvatar = new ProfileAvatar ({
        uploadAvatarImage: uploadPhoto
    });

    const form = new Form({
        inputs: inputs.map((input: Dictionary) => input.transformToString()),
        btn: button.transformToString(),
    }, {
        submit: (event: Event) => {
            checkAndCollectData(event, "/overviewProfile");
        },
    });


    const context = {
        profileAvatar: profileAvatar.transformToString(),
        form: form.transformToString()
    };

    return template(context);
}
