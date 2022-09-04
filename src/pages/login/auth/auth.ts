import * as Handlebars from "handlebars";
import {validation} from '../../../utils';
import authTemplate from "./auth.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn"
import { Link } from "../../../components/link";
import {nanoid} from "nanoid";

export function auth() {
  const template = Handlebars.compile(authTemplate);

  const loginInput = new Input(
    {
      name: "login",
      label: "Логин",
      type: "text",
      required: true,
      wrapperClassName: "login__input-wrapper",
      errorMessage: "Неверный логин",
    },
      {
          blur: (event: Event) => {
              validation({ event });
          },
      }
  );

  const passwordInput = new Input(
    {
      name: "password",
      label: "Пароль",
      type: "password",
      required: true,
      wrapperClassName: "login__input-wrapper",
      errorMessage: "Неверный пароль",
    },
      {
          change: (event: Event) => {
              validation({ event });
          },
      }
  );

  const button = new Btn({
    btnText: "Авторизоваться",
    btnClassName: "login",
    btnType: "submit"
  });

  const link = new Link({
      linkText: "Войти",
      linkHref: "/registration",
  });

  const context = {
    inputs: [loginInput.transformToString(), passwordInput.transformToString()],
    btn: button.transformToString(),
    link: link.transformToString(),
    id: nanoid(6)
  };

  return template(context);
}
