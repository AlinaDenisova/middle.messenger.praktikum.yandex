import * as Handlebars from "handlebars";
import editProfileTemplate from "./editProfile.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import { Block } from "../../../utils";
import "./profile-edit.scss";
import { ProfileAvatar } from "../../../components/profileAvatar";
import { Modal } from "../../../components/modal";
import { checkAndCollectData, checkValidation } from "../../../utils";
import { UserController } from "../../../controllers";
import { Form } from "../../../components/form";
import router from "../../../router";
import {getAvatar, getName} from "../profile";
import {closeModal, showModal} from "../../../pages/chat/chat"

const controller = new UserController();

const getTemplate = () => {
    const template = Handlebars.compile(editProfileTemplate);

    const item = localStorage.getItem("user");
    let user;
    console.log(item)
    if (item) {
        user = JSON.parse(item);
    }

    const inputs = [
        new Input({
            value: user?.email || "",
            name: "email",
            label: "Почта",
            type: "text",
            required: true,
            disabled: false,
            errorMessage:
                "Адрес электронной почты содержит ошибки",
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
            value: user?.login || "",
            name: "login",
            label: "Логин",
            type: "text",
            required: true,
            disabled: false,
            errorMessage:
                "Длина логина 3-20 символов, должен быть написан латиницей",
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
            value: user?.first_name || "",
            name: "first_name",
            label: "Имя",
            type: "text",
            required: false,
            disabled: false,
            errorMessage:
                "Ввведите имя с заглавной буквы без цифр и символов",
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
            value: user?.second_name || "",
            name: "second_name",
            label: "Фамилия",
            type: "text",
            required: false,
            disabled: false,
            errorMessage:
                "Ввведите фамилию с заглавной буквы без цифр и символов",
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
            value: user?.display_name || "",
            name: "display_name",
            label: "Имя в чате",
            type: "text",
            required: false,
            disabled: false,
            errorMessage:
                "Длина ника 3-20 символов, должен быть написан латиницей",
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
            value: user?.phone || "",
            name: "phone",
            label: "Телефон",
            type: "text",
            required: false,
            disabled: false,
            errorMessage:
                "Введите номер в международном формате, например: +7..",
            isProfileInput: true,
        }, {
                focus: (event: Event) => {
                    checkValidation({ event });
                },
                blur: (event: Event) => {
                    checkValidation({ event });
                },
            }
        )
    ]

    const button = new Btn({
        btnText: "Сохранить",
        btnType: "submit",
        btnClassName: "profile-edit",
    }
    );

    const profileAvatar = new ProfileAvatar ({
        uploadAvatarImage: getAvatar(),
        isClickableAvatar: true,
    },
        {
            click: async () => {
                await showModal("upload-avatar-modal");
            },
    });

    const uploadInput = new Input({
        name: "file",
        label: "Выбрать файл на устройстве",
        type: "file",
        required: true,
        dataType: "file",
        labelClassName: "modal-input__label--upload-avatar",
        inputClassName: "modal-input--upload-avatar"
    },
    {
        change: async (e: CustomEvent) => {
            const input = e.target as HTMLInputElement;
            const image = document.getElementById("avatar") as HTMLImageElement;
            const file = input.files[0];
            if (file && image) {
                await controller.changeUserAvatar(file, image);
            }
        },
    })

    const backLink = new Btn(
        {
            btnType: "button",
            linkText: "Отмена",
            isLink: true,
        },
        {
            click: () => {
                closeModal("upload-avatar-modal", ".modal-input--upload-avatar");
            },
        }
    );

    const avatarModal = new Modal (
        {
            dataId: "upload-avatar-modal",
            titleText: "Загрузите файл",
            input: uploadInput.transformToString(),
            backLink: backLink.transformToString()
        }
    )

    const form = new Form({
        inputs: inputs.map((input) => input.transformToString()),
        btn: button.transformToString(),
    }, {
        submit: async (event: Event) => {
            const isError = await checkAndCollectData(event, controller, "changeUserProfile");
            if (!isError) {
                router.go("/settings");
            } else {
                console.warn(isError);
            }
        },
    });

    const context = {
        avatarModal: avatarModal.transformToString(),
        userName: getName(),
        form: form.transformToString(),
        profileAvatar: profileAvatar.transformToString()
    };

    return template(context);
}

export class EditProfile extends Block {
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
