import HTTPTransport from "../utils/HTTPTransport";
const defaultUrl = "/auth";
const authAPIInstance = new HTTPTransport(defaultUrl);

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export class AuthApi {
  signUp(data: ISignUpData) {
    return authAPIInstance.post("/signup", data);
  }

  signIn(data: ILoginData) {
    return authAPIInstance.post("/signin", data);
  }

  getUser() {
    return authAPIInstance.get("/user");
  }

  logOut() {
    return authAPIInstance.post("/logout");
  }
}
