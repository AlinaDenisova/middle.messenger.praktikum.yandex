import { ErrorPage } from "../pages/error";
import { Login } from "../pages/login";
// import { chat } from "../pages/chat";
import {
  errorPageSchema,
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
  // .use(`/${routes.selectChat}`, chat, { isChatSelected: false })
  // .use(`/${routes.openChat}`, chat, { isChatSelected: true })
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
