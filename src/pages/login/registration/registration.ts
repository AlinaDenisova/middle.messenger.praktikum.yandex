import * as Handlebars from "handlebars";
import registrationTemplate from "./registration.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn"
import { Link } from "../../../components/link";
import {checkAndCollectData, validation} from "../../../utils";
import {Form} from "../../../components/form";

export function registration() {
  const template = Handlebars.compile(registrationTemplate);

  const inputs = [
    new Input(
      {
        name: "email",
        label: "Почта",
        type: "text",
        required: true,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
          "Адрес электронной почты содержит ошибки",
      },
      {
          blur: (event: Event) => {
              validation({ event });
          },
      }
    ),
    new Input(
      {
        name: "login",
        label: "Логин",
        type: "text",
        required: true,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
          "Длина логина 3-20 символов, должен быть написан латиницей",
      },
        {
            blur: (event: Event) => {
                validation({ event });
            },
        }
    ),
    new Input(
      {
        name: "name",
        label: "Имя",
        type: "text",
        required: false,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
          "Ввведите имя с заглавной буквы без цифр и символов",
      },
        {
            blur: (event: Event) => {
                validation({ event });
            },
        }
    ),
    new Input(
      {
        name: "lastName",
        label: "Фамилия",
        type: "text",
        required: false,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
          "Ввведите фамилию с заглавной буквы без цифр и символов",
      },
        {
            blur: (event: Event) => {
                validation({ event });
            },
        }
    ),
    new Input(
      {
        name: "phone",
        label: "Телефон",
        type: "text",
        required: false,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
          "Введите номер в международном формате, например: +7..",
      },
        {
            blur: (event: Event) => {
                validation({ event });
            },
        }
    ),
    new Input(
      {
        name: "password",
        label: "Пароль",
        type: "password",
        required: true,
        wrapperClassName: "login__input-wrapper",
        errorMessage:
          "Длина пароля 8-40 символов, обязательна заглавная буква и цифра",
      },
        {
            blur: (event: Event) => {
                validation({ event });
            },
        }
    ),
    new Input(
      {
        name: "secondPassword",
        label: "Пароль (ещё раз)",
        type: "password",
        required: true,
        errorMessage: "Введенные пароли не совпадают",
      },
        {
            blur: (event: Event) => {
                validation({ event });
            },
        }
    ),
  ];

  const button = new Btn({
      btnText: "Зарегистрироваться",
      btnClassName: "login",
      btnType: "submit"
  });

  const link = new Link({
      linkText: "Войти",
      linkHref: "/auth",
  });

    const form = new Form(
        {
            inputs: inputs.map((input) => input.transformToString()),
            btn: button.transformToString(),
        },
        {
            submit: (event: Event) => {
                checkAndCollectData(event, "/selectChat");
            },
        }
    );

    const context = {
        link: link.transformToString(),
        form: form.transformToString(),
    };

    return template(context);
}
