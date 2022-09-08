import * as Handlebars from "handlebars";
import authTemplate from "./auth.tmpl";
import { Input } from "../../../components/input";
import { Btn } from "../../../components/btn"
import { Link } from "../../../components/link";
import { Form } from "../../../components/form";
import { validation, checkAndCollectData } from '../../../utils';

export function auth() {
  const template = Handlebars.compile(authTemplate);

    const inputs = [
        new Input(
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
        ),

        new Input(
            {
                name: "password",
                label: "Пароль",
                type: "password",
                required: true,
                wrapperClassName: "login__input-wrapper",
                errorMessage: "Неверный пароль",
            },
            {
                blur: (event: Event) => {
                    validation({ event });
                },
            }
        )
    ]


  const button = new Btn({
    btnText: "Авторизоваться",
    btnClassName: "login",
    btnType: "submit"
  });

  const link = new Link({
      linkText: "Нет аккаунта?",
      linkHref: "/registration",
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
