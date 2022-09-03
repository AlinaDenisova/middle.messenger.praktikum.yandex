import { Dictionary } from "./block";

export const routes: Dictionary = Object.freeze({
  siteMap: "siteMap",
  auth: "auth",
  registration: "registration",
  notFound: "notFound",
  internalServerError: "internalServerError",
  selectChat: "selectChat",
  openChat: "openChat",
  overviewProfile: "overviewProfile",
  editProfile: "editProfile",
  editProfilePassword: "editProfilePassword",
});

export const errorPageCodes: Dictionary = Object.freeze({
  notFound: "404",
  internalServerError: "500",
});

export const errorPageSchema: Dictionary = Object.freeze({
  404: {
    errorText: "Не туда попали",
    linkText: "Назад к чатам",
  },
  500: {
    errorText: "Мы уже фиксим",
    linkText: "Назад к чатам",
  },
});