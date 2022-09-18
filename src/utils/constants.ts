import { Dictionary } from "./block";

export const routes: Dictionary = Object.freeze({
  siteMap: "siteMap",
  auth: "auth",
  registration: "registration",
  notFound: "404",
  internalServerError: "500",
  unauthorized: '401',
  forbidden: '403',
  selectChat: "selectChat",
  openChat: "openChat",
  overviewProfile: "overviewProfile",
  editProfile: "editProfile",
  editProfilePassword: "editProfilePassword",
});

export const errorPageSchema: Dictionary = Object.freeze({
  401: {
    errorText: 'Пользователь не авторизован',
    linkText: 'Назад к странице входа',
  },
  403: {
    errorText: 'Нет доступа',
    linkText: 'В доступе отказано',
  },
  404: {
    errorText: "Не туда попали",
    linkText: "Назад к чатам",
  },
  500: {
    errorText: "Мы уже фиксим",
    linkText: "Назад к чатам",
  },
});