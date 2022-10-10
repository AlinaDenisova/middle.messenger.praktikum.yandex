import "./utils/helpers";
import "./static/styles/base.scss";
import {
    errorPageSchema, profilePage,
    routes,
} from "./utils/constants";
import Router from "./router/Router";
import {Login} from "./pages/login";
import {Chat} from "./pages/chat";
import {Profile} from "./pages/profile";
import {ErrorPage} from "./pages/error";

export { IRoute } from "./router/Route";
export { IRouter } from "./router/Router";

window.addEventListener('DOMContentLoaded', async () => {
    const getErrorScheme = (errorCode: string) => ({
        errorCode,
        errorText: errorPageSchema[errorCode].errorText,
        linkText: errorPageSchema[errorCode].linkText,
    });

    Router
        .use("/", Login, {isAuth: true})
        .use(`/${routes.auth}`, Login, {isAuth: true})
        .use(`/${routes.registration}`, Login, {isAuth: false})
        .use(`/${routes.selectChat}`, Chat, {isChatOpen: false})
        .use(`/${routes.openChat}`, Chat, {isChatOpen: true})
        .use(`/${routes.overviewProfile}`, Profile, {profileType: profilePage.overviewProfile})
        .use(`/${routes.editProfile}`, Profile, {profileType: profilePage.editProfile})
        .use(`/${routes.editProfilePassword}`, Profile, {profileType: profilePage.editProfilePassword})
        .use(`/${routes.forbidden}`, ErrorPage, {
            scheme: getErrorScheme(routes.forbidden),
        })
        .use(`/${routes.internalServerError}`, ErrorPage, {
            scheme: getErrorScheme(routes.internalServerError),
        })
        .use(`/${routes.unauthorized}`, ErrorPage, {
            scheme: getErrorScheme(routes.unauthorized),
        })
        .use(`/${routes.notFound}`, ErrorPage, {
            scheme: getErrorScheme(routes.notFound),
        })
        .notFound(ErrorPage, {scheme: getErrorScheme(routes.notFound)});

    Router.start();
})
