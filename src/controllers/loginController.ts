import { AuthApi, ILoginData, ISignUpData } from '../api';
import { store } from '../store';
import { redirect } from '../utils';

const authInstance = new AuthApi();

export class LoginController {
  public async login(data: ILoginData) {
    try {
      await authInstance.signIn(data);
      console.log(data)
      await this.getUser();
    } catch (e) {
      redirect(e.reason);
      return e.reason;
    }
  }

  public async signUp(data: ISignUpData) {
    try {
      await authInstance.signUp(data);
      console.log(data)
      await this.getUser();
      console.log(this.getUser())
    } catch (e) {
      console.log(e)
      redirect(e.reason);
      return e.reason;
    }
  }

  public async logOut() {
    try {
      await authInstance.logOut();
      localStorage.clear();
    } catch (e) {
      redirect(e.reason);
      return e.reason;
    }
  }

  public async getUser() {
    let res;
    try {
      res = await authInstance.getUser();
    } catch (e) {
      redirect(e.reason);
      res = e.reason;
    }
    if (res !== 'Not found') {
      store.setStateAndPersist({ user: res });
      console.log(res)
      store.setStateAndPersist({ myID: res.id });
    }
    return res;
  }
}
