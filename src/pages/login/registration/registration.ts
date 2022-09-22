import * as Handlebars from "handlebars";
import registrationTemplate from "./registration.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn";
import {checkAndCollectData, checkValidation} from "../../../utils";
import { Form } from "../../../components/form";
import { Block } from "../../../utils/block";
import router from "../../../router";
import { LoginController, ChatController } from '../../../controllers';

const controller = new LoginController();
const chatController = new ChatController();

const getTemplate = () => {
  const template = Handlebars.compile(registrationTemplate);

  const inputs = [
    new Input({
        name: "email",
        label: "Почта",
        type: "text",
        required: true,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
            "Адрес электронной почты содержит ошибки",
        dataType: 'email',
    },
        {
          focus: (event: Event) => {
              checkValidation({ event });
          },
          blur: (event: Event) => {
              checkValidation({ event });
          },
    }),
    new Input({
        name: "login",
        label: "Логин",
        type: "text",
        required: true,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
            "Длина логина 3-20 символов, должен быть написан латиницей",
        dataType: 'login',
    }, {
        focus: (event: Event) => {
            checkValidation({ event });
        },
        blur: (event: Event) => {
            checkValidation({ event });
        },
    }),
    new Input({
        name: "first_name",
        label: "Имя",
        type: "text",
        required: false,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
            "Ввведите имя с заглавной буквы без цифр и символов",
        dataType: 'name',
    }, {
        focus: (event: Event) => {
            checkValidation({ event });
        },
        blur: (event: Event) => {
            checkValidation({ event });
        },
    }),
    new Input({
        name: "second_name",
        label: "Фамилия",
        type: "text",
        required: false,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
            "Ввведите фамилию с заглавной буквы без цифр и символов",
        dataType: 'name',
    }, {
        focus: (event: Event) => {
            checkValidation({ event });
        },
        blur: (event: Event) => {
            checkValidation({ event });
        },
    }),
    new Input({
        name: "phone",
        label: "Телефон",
        type: "text",
        required: false,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
            "Введите номер в международном формате, например: +7..",
        dataType: 'phone',
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
        errorMessage:
            "Длина пароля 8-40 символов, обязательна заглавная буква и цифра",
        dataType: 'password',
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
        label: "Пароль (ещё раз)",
        type: "password",
        required: true,
        errorMessage: "Введенные пароли не совпадают",
        dataType: 'password',
    }, {
        focus: (event: Event) => {
            checkValidation({ event });
        },
        blur: (event: Event) => {
            checkValidation({ event });
        },
    }),
  ];

  const btn = new Btn({
      btnText: "Зарегистрироваться",
      btnClassName: "login",
      btnType: "submit"
  });

  const link = new Btn({
      linkText: "Войти",
      isLink: true,
      btnType: "button",
  },
    {
        click: async () => {
            router.go("/");
        }
  });

    const form = new Form({
        inputs: inputs.map((input) => input.transformToString()),
        btn: btn.transformToString(),
    }, {
        submit: async (event: CustomEvent) => {
            const isError = await checkAndCollectData(event, controller, 'signUp');
            if (!isError) {
                await chatController.getAllChats();
                router.go('/messenger');
            } else {
                console.warn(isError);
            }
            await chatController.getAllChats();
        },
    });

    const context = {
        link: link.transformToString(),
        form: form.transformToString(),
    };

    return template(context);
}

export class Registration extends Block {
    constructor(context = {}, events: Record<string, () => void>) {
        super("div", {
            context: {
                ...context,
            },
            template: getTemplate(),
            events,
        });
    }
}
