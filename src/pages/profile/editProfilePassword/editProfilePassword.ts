import * as Handlebars from "handlebars";
import editProfilePasswordTemplate from "./editProfilePassword.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import { Dictionary } from "../../../utils/block";
import "./profile-edit.scss";
import {ProfileAvatar} from "../../../components/profileAvatar";
import uploadPhoto from "../../../assets/icons/upload-photo.svg";
import {nanoid} from "nanoid";

export function editProfilePassword() {
    const template = Handlebars.compile(editProfilePasswordTemplate);

    const inputs = [
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
                        "Длина пароля 8-40 символов, обязательна заглавная буква и цифра",
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
        ]

    const button = new Btn({
        btnText: "Сохранить",
        btnType: "submit",
        btnClassName: "profile-password"
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
