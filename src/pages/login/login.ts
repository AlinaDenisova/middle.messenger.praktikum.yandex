import * as Handlebars from 'handlebars';
import homePageTemplate from './login.tmpl';
import { auth } from './auth';
import { registration } from './registration';
import { routes } from '../../utils';
import './login.scss';

export function login(route: string) {
    const template = Handlebars.compile(homePageTemplate);
    const isAuth = route === routes.auth;

    const context = {
        title: isAuth ? 'Вход' : 'Регистрация',
        content: isAuth ? auth : registration,
    };

    return template(context);
}