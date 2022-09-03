import { siteMap } from "./pages/siteMap";
import { errorPage } from "./pages/error";
import { login } from "./pages/login";
import { profile } from "./pages/profile";
import { chat } from "./pages/chat";
import {
    errorPageCodes,
    errorPageSchema,
    routes,
    editProfile,
} from "./utils";
import "./styles/base.scss";

const app: HTMLElement | null = document.getElementById("app");

const getErrorScheme = (errorCode: string) => ({
    errorCode,
    errorText: errorPageSchema[errorCode].errorText,
    linkText: errorPageSchema[errorCode].linkText,
});

const content = {
    siteMap: siteMap(routes.siteMap),
    auth: login(routes.auth),
    registration: login(routes.registration),
    internalServerError: errorPage(
        getErrorScheme(errorPageCodes.internalServerError)
    ),
    notFound: errorPage(getErrorScheme(errorPageCodes.notFound)),
    openChat: chat(routes.openChat),
    selectChat: chat(routes.selectChat),
    overviewProfile: profile(routes.overviewProfile),
    editProfile: profile(editProfile.editProfile),
    editProfilePassword: profile(editProfile.editProfilePassword),
};

if (app) {
    switch (window.location.pathname) {
        case "/":
        case `/${routes.siteMap}`:
            app.innerHTML = content.siteMap;
            break;
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
        case `/${routes.selectChat}`:
            app.innerHTML = content.selectChat;
            break;
        case `/${routes.openChat}`:
            app.innerHTML = content.openChat;
            break;
        case `/${routes.overviewProfile}`:
            app.innerHTML = content.overviewProfile;
            break;
        case `/${routes.editProfile}`:
            app.innerHTML = content.editProfile;
            break;
        case `/${routes.editProfilePassword}`:
            app.innerHTML = content.editProfilePassword;
            break;
    }
}
