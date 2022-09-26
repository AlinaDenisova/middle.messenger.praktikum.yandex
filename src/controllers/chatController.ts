import { ChatApi, IChatUser, ICreateChat } from '../api';
import { Dictionary } from '../utils';
import { store } from '../store';
import { redirect } from '../utils';

const chatAPIInstance = new ChatApi();

export interface IChatData {
  avatar: string;
  created_by: number;
  id: number;
  last_message: Dictionary;
  title: string;
  time: Dictionary;
  unread_count: number;
}

interface IUsers {
  id: string;
  users: string[];
}

export class ChatController {
  public async getChats() {
    try {
      await chatAPIInstance.get();
    } catch (e) {
      redirect(e.reason);
      return e.reason;
    }
  }

  public async createChat(data: ICreateChat) {
    try {
      const chatData = await chatAPIInstance.createChat(data);
      if (chatData) {
        console.log(chatData)
        store.setStateAndPersist({ currentChat: (chatData as IChatData).id });
      }
      await this.getAllChats();
    } catch (e) {
      redirect(e.reason);
      return e.reason;
    }
  }

  public async getAllChats() {
    let res;
    try {
      res = await chatAPIInstance.get();
    } catch (e) {
      redirect(e.reason);
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ chats: res });
    }
    return res;
  }

  public async addUser(data: IChatUser) {
    try {
      await chatAPIInstance.addUser(data);
    } catch (e) {
      redirect(e.reason);
      return e.reason;
    }
  }

  public async removeUser(data: IChatUser) {
    try {
      await chatAPIInstance.removeUser(data);
      const chatId = data.chatId;
      const users = store.getState().usersInChats;
      const storeItem = users.filter(
        (el: IUsers) => el.id === chatId.toString()
      );
      const usersInChats = storeItem[0].users.filter(
        (id: string) => id != data.users[0]
      );
      storeItem[0].users = usersInChats;
      store.setStateAndPersist({ usersInChats: users });
    } catch (e) {
      redirect(e.reason);
      return e.reason;
    }
  }

  public async getChatToken(id?: number) {
    let res;
    try {
      res = await chatAPIInstance.getChatUsers(id);
    } catch (e) {
      redirect(e.reason);
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ savedToken: res });
    }
    return res;
  }

  public async getChatUsers(id: number) {
    try {
      return await this.getChatToken(id);
    } catch (e) {
      redirect(e.reason);
      return e.reason;
    }
  }

  public async connectToChat(userId: number, chatId: number) {
    try {
      const tokenData = await this.getChatUsers(chatId);
      const { token } = tokenData || {};
      const params = { userId, chatId, token };

      store.setStateAndPersist({ wsParams: params });
    } catch (e) {
      redirect(e.reason);
    }
  }
}
