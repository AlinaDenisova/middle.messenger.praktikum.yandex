import * as Handlebars from "handlebars";
import overviewProfileTemplate from "./overviewProfile.tmpl";
import {ProfileAvatar} from "../../../components/profileAvatar";
import { Input } from "../../../components/input";
import "./profile-overview.scss";
import { Block } from "../../../utils";
import { Btn } from "../../../components/btn"
import { LoginController } from "../../../controllers";
import router from "../../../router";
import { getName, getAvatar } from '../profile';

const controller = new LoginController();

const getTemplate = () => {
    const template = Handlebars.compile(overviewProfileTemplate);

    const item = localStorage.getItem('user');
    let user;
    if (item) {
        user = JSON.parse(item);
    }

    const inputs = [
        new Input({
            value: user?.email || '',
            name: "email",
            label: "Почта",
            type: "text",
            required: true,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: user?.login || '',
            name: "login",
            label: "Логин",
            type: "text",
            required: true,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: user?.first_name || '',
            name: "name",
            label: "Имя",
            type: "text",
            required: false,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: user?.second_name || '',
            name: "lastName",
            label: "Фамилия",
            type: "text",
            required: false,
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: user?.display_name || '',
            name: "nickname",
            label: "Имя в чате",
            type: "text",
            disabled: true,
            isProfileInput: true,
        }),
        new Input({
            value: user?.phone || '',
            name: "phone",
            label: "Телефон",
            type: "text",
            required: false,
            disabled: true,
            isProfileInput: true,
        }),
    ];

    const signOutBtn = new Btn (
        {
            linkText: 'Выйти',
            isLink: true,
            btnType: 'submit',
            btnClassName: 'profile-overview__actions-link profile-overview__actions-link--highlight',
        },
        {
            click: async () => {
                await controller.logOut();
                router.go('/');
            },
        }
    );

    const changeData = new Btn (
        {
            btnType: 'button',
            isLink: true,
            btnClassName: 'profile-overview__actions-link',
            linkText: 'Изменить данные',
        },
        {
            click: async () => {
                router.go('/settings-edit');
            },
        }
    );

    const changePassword = new Btn (
        {
            btnType: 'button',
            isLink: true,
            btnClassName: 'profile-overview__actions-link',
            linkText: 'Изменить пароль',
        },
        {
            click: async () => {
                router.go('/settings-edit-password');
            },
        }
    );

    const profileAvatar = new ProfileAvatar ({
        uploadAvatarImage: getAvatar(),
        isClickableAvatar: false,
    });

    const context = {
        inputs: inputs.map((input) => input.transformToString()),
        signOutBtn: signOutBtn.transformToString(),
        changeData: changeData.transformToString(),
        changePassword: changePassword.transformToString(),
        profileAvatar: profileAvatar.transformToString(),
        userName: getName(),
    };

    return template(context);
}

export class OverviewProfile extends Block {
    constructor(context = {}, events = {}) {
        super('div', {
            context: {
                ...context,
            },
            template: getTemplate(),
            events,
        });
    }
}

