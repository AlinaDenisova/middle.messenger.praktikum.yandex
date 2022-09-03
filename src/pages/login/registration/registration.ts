import * as Handlebars from "handlebars";
import registrationTemplate from "./registration.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn"
import { Link } from "../../../components/link";
import {nanoid} from "nanoid";

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
      }
    ),
    new Input(
      {
        name: "secondPassword",
        label: "Пароль (ещё раз)",
        type: "password",
        required: true,
        errorMessage: "Введенные пароли не совпадают",
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
      linkHref: "/registration",
  });

  const context = {
    inputs: inputs.map((input) => input.transformToString()),
    btn: button.transformToString(),
    link: link.transformToString(),
    id: nanoid(6)
  };

    return template(context);
}
