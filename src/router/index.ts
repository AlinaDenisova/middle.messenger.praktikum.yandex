import { Chat } from "../pages/chat";
import { ErrorPage } from "../pages/error";
import { Login } from "../pages/login";
import { Profile } from "../pages/profile";
import {
  errorPageSchema, profilePage,
  routes,
} from "../utils";

import { Router } from "./Router";

export { IRoute } from "./Route";
export { IRouter } from "./Router";

const router = new Router(".app");

const getErrorScheme = (errorCode: string) => ({
  errorCode,
  errorText: errorPageSchema[errorCode].errorText,
  linkText: errorPageSchema[errorCode].linkText,
});

router
  .use("/", Login, { isAuth: true })
  .use(`/${routes.auth}`, Login, { isAuth: true })
  .use(`/${routes.registration}`, Login, { isAuth: false })
  .use(`/${routes.selectChat}`, Chat, { isChatOpen: false })
  .use(`/${routes.openChat}`, Chat, { isChatOpen: true })
  .use(`/${routes.overviewProfile}`, Profile, { profileType: profilePage.overviewProfile })
  .use(`/${routes.editProfile}`, Profile, { profileType: profilePage.editProfile })
  .use(`/${routes.editProfilePassword}`, Profile, { profileType: profilePage.editProfilePassword })
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
  .notFound(ErrorPage, { scheme: getErrorScheme(routes.notFound) });

export default router;
