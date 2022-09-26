import * as Handlebars from "handlebars";
import authTemplate from "./auth.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn"
import router from '../../../router';
import { Form } from "../../../components/form";
import {checkAndCollectData, checkValidation} from '../../../utils';
import { Block } from '../../../utils';
import { LoginController, ChatController } from '../../../controllers';

const controller = new LoginController();
const chatController = new ChatController();

const getTemplate = () => {
    const template = Handlebars.compile(authTemplate);

    const inputs = [
        new Input({
            name: "login",
            label: "Логин",
            type: "text",
            required: true,
            wrapperClassName: "login__input-wrapper",
            errorMessage: "Неверный логин",
            dataType: "login",
        }, {
            focus: (event: Event) => {
                checkValidation({ event });
            },
            blur: (event: Event) => {
                checkValidation({ event });
            },
        }),

        new Input({
            name: "password",
            label: "Пароль",
            type: "password",
            required: true,
            wrapperClassName: "login__input-wrapper",
            errorMessage: "Неверный пароль",
            dataType: "password"
        }, {
            focus: (event: Event) => {
                checkValidation({ event });
            },
            blur: (event: Event) => {
                checkValidation({ event });
            },
        })
    ]

    const button = new Btn({
        btnText: "Авторизоваться",
        btnClassName: "login",
        btnType: "submit"
    });

    const link = new Btn({
            btnType: 'button',
            isLink: true,
            linkText: "Нет аккаунта?",
        },
        {
            click: async () => {
                router.go('/sign-up');
            },
    });

    const form = new Form(
        {
            inputs: inputs.map((input) => input.transformToString()),
            btn: button.transformToString(),
        },
        {
            submit: async (event: CustomEvent) => {
                const isError = await checkAndCollectData(event, controller, 'login');
                if (!isError) {
                    await chatController.getAllChats();
                    router.go('/messenger');
                } else {
                    console.warn(isError);
                }
            },
        }
    );

    const context = {
        link: link.transformToString(),
        form: form.transformToString(),
    };

    return template(context);
}

export class Auth extends Block {
    constructor(context = {}, events: Record<string, () => void>) {
        super('div', {
            context: {
                ...context,
            },
            template: getTemplate(),
            events,
        });
    }
}
