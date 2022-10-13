import loginTemplate from "./login.tmpl";
import { Auth } from "./auth";
import { Registration } from "./registration";
import { Block } from "../../utils/block";
import "./login.scss";

export type TLogin = {
    isAuth?: boolean;
    content?: string;
};

export class Login extends Block {
    constructor(context: TLogin, events: Record<string, () => void>) {
        super("div", {
            context: {
                ...context,
                title: context.isAuth ? "Вход" : "Регистрация",
                content: context.isAuth
                    ? new Auth(context, events).transformToString()
                    : new Registration(context, events).transformToString(),
            },
            template: loginTemplate,
            events,
        });
    }
}
