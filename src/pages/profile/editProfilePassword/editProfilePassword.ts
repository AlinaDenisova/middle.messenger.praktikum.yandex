import * as Handlebars from "handlebars";
import editProfilePasswordTemplate from "./editProfilePassword.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import { Block } from "../../../utils";
import { ProfileAvatar } from "../../../components/profileAvatar";
import "./profile-password.scss";
import {checkAndCollectData, checkValidation } from "../../../utils";
import {Form} from "../../../components/form";
import router from "../../../router";
import {UserController} from "../../../controllers";
import {getAvatar} from "../profile";

const controller = new UserController();

const getTemplate = () => {
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
                    focus: (event: Event) => {
                        checkValidation({ event });
                    },
                    blur: (event: Event) => {
                        checkValidation({ event });
                    },
                }
            ),
            new Input({
                name: "secondPassword",
                label: "Новый пароль",
                type: "password",
                required: true,
                errorMessage:
                    "Длина пароля 8-40 символов, обязательна заглавная буква и цифра",
                isProfileInput: true,
                }, {
                    focus: (event: Event) => {
                        checkValidation({ event });
                    },
                    blur: (event: Event) => {
                        checkValidation({ event });
                    },
                }
            ),
            new Input({
                name: "secondPassword",
                label: "Повторите новый пароль",
                type: "password",
                required: true,
                errorMessage: "Введенные пароли не совпадают",
                isProfileInput: true,
                }, {
                    focus: (event: Event) => {
                        checkValidation({ event });
                    },
                    blur: (event: Event) => {
                        checkValidation({ event });
                    },
                }
            ),
        ]

    const button = new Btn({
            btnText: "Сохранить",
            btnType: "submit",
            btnClassName: "profile-edit",
        }
    );

    const profileAvatar = new ProfileAvatar ({
        uploadAvatarImage: getAvatar(),
        isClickableAvatar: false,
    });

    const form = new Form({
        inputs: inputs.map((input) => input.transformToString()),
        btn: button.transformToString(),
    }, {
        submit: async (event: Event) => {
            const isError = await checkAndCollectData(event, controller, "changeUserPassword");
            if (!isError) {
                router.go("/settings");
            } else {
                console.warn(isError);
            }
        },
    });


    const context = {
        profileAvatar: profileAvatar.transformToString(),
        form: form.transformToString()
    };

    return template(context);
}

export class EditProfilePassword extends Block {
    constructor(context = {}, events = {}) {
        super("div", {
            context: {
                ...context,
            },
            template: getTemplate(),
            events,
        });
    }
}

