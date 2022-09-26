import { Dictionary } from "./block";

export const routes: Dictionary = Object.freeze({
  siteMap: "siteMap",
  auth: "sign-in",
  registration: "sign-up",
  notFound: "404",
  internalServerError: "500",
  unauthorized: '401',
  forbidden: '403',
  selectChat: "messenger",
  openChat: "open-messenger",
  overviewProfile: "settings",
  editProfile: "settings-edit",
  editProfilePassword: "settings-edit-password",
});

export const profilePage: Dictionary = Object.freeze({
  overviewProfile: 'overviewProfile',
  editProfile: 'editProfile',
  editProfilePassword: 'editProfilePassword'
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

export const avatarIconBase64 = `
data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIGZ
pbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjY1IiBjeT0iNjUiIHI9IjY1Ii
BmaWxsPSIjRUZFRkVGIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODEgNDdINDlDND
cuODk1NCA0NyA0NyA0Ny44OTU0IDQ3IDQ5VjcwLjI2NjdMNTkuNjU0NyA2Ny4zMTM5QzYwLjU0ODYgNjcuMTA1MyA2MS40NjM1IDY3IDY
yLjM4MTQgNjdINjcuNjE4NkM2OC41MzY1IDY3IDY5LjQ1MTQgNjcuMTA1MyA3MC4zNDUzIDY3LjMxMzlMODMgNzAuMjY2N1Y0OUM4MyA0N
y44OTU0IDgyLjEwNDYgNDcgODEgNDdaTTQ5IDQ1QzQ2Ljc5MDkgNDUgNDUgNDYuNzkwOSA0NSA0OVY4MUM0NSA4My4yMDkxIDQ2Ljc5MDkg
ODUgNDkgODVIODFDODMuMjA5MSA4NSA4NSA4My4yMDkxIDg1IDgxVjQ5Qzg1IDQ2Ljc5MDkgODMuMjA5MSA0NSA4MSA0NUg0OVpNNTUuOTA
5MSA1OS41NDU1QzU3LjkxNzQgNTkuNTQ1NSA1OS41NDU1IDU3LjkxNzQgNTkuNTQ1NSA1NS45MDkxQzU5LjU0NTUgNTMuOTAwOCA1Ny45MT
c0IDUyLjI3MjcgNTUuOTA5MSA1Mi4yNzI3QzUzLjkwMDggNTIuMjcyNyA1Mi4yNzI4IDUzLjkwMDggNTIuMjcyOCA1NS45MDkxQzUyLjI3Mj
ggNTcuOTE3NCA1My45MDA4IDU5LjU0NTUgNTUuOTA5MSA1OS41NDU1WiIgZmlsbD0iI0NEQ0RDRCIvPgo8L3N2Zz4K`;