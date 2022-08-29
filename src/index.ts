import { errorPage } from './pages/error';
import { login } from './pages/login';
import {
    errorPageCodes,
    errorPageSchema,
    routes,
} from './utils';
import './styles/base.scss';

const app: HTMLElement | null = document.getElementById('app');

const getErrorScheme = (errorCode: string) => ({
    errorCode,
    errorText: errorPageSchema[errorCode].errorText,
    linkText: errorPageSchema[errorCode].linkText,
});

const content = {
    auth: login(routes.auth),
    registration: login(routes.registration),
    internalServerError: errorPage(
        getErrorScheme(errorPageCodes.internalServerError)
    ),
    notFound: errorPage(getErrorScheme(errorPageCodes.notFound))
};

if (app) {
    switch (window.location.pathname) {
        case '/':
        case `/${routes.internalServerError}`:
            app.innerHTML = content.internalServerError;
            break;
        case `/${routes.notFound}`:
        default:
            app.innerHTML = content.notFound;
            break;
        case `/${routes.auth}`:
            app.innerHTML = content.auth;
            break;
        case `/${routes.registration}`:
            app.innerHTML = content.registration;
            break;
    }
}
