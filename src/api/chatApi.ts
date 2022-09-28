import HTTPTransport from "../utils/HTTPTransport";
const defaultUrl = "/chats";
const chatAPIInstance = new HTTPTransport(defaultUrl);

export interface IChatUser {
  users: string[];
  chatId: number;
}

export interface ICreateChat {
  title: string;
}

export class ChatApi {
  get() {
    return chatAPIInstance.get("/");
  }

  createChat(data: ICreateChat) {
    return chatAPIInstance.post("/", data);
  }

  addUser(data: IChatUser) {
    return chatAPIInstance.put("/users", data);
  }

  removeUser(data: IChatUser) {
    return chatAPIInstance.delete("/users", data);
  }

  getChatUsers(chatId: number = 0) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}
