import loginTemplate from "./login.tmpl";
import { Auth } from "./auth";
import { Registration } from "./registration";
import { nanoid } from 'nanoid';
import { Block } from '../../utils/block';
import "./login.scss";

export type TLogin = {
    isAuth?: boolean;
    content?: string;
};

export class Login extends Block {
    constructor(context: TLogin, events: Record<string, () => void>) {
        super('div', {
            context: {
                ...context,
                header: context.isAuth ? 'Вход' : 'Регистрация',
                content: context.isAuth
                    ? new Auth().transformToString()
                    : new Registration().transformToString(),
                id: nanoid(6),
            },
            template: loginTemplate,
            events,
        });
    }
}