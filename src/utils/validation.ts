import { Dictionary } from '../utils/block';

const showWarningMessage = (input: HTMLInputElement, isError: boolean) => {
  const parent = input.parentNode || input.parentElement;
  const messageElement =
    parent &&
    (parent.querySelector(".input__error") ||
      parent.querySelector(".input-profile__error"));

  if (messageElement) {
    if (isError) {
      messageElement.classList.remove("hidden");
    } else {
      messageElement.classList.add("hidden");
    }
  }
};

const regexp = {
  checkLogin: /^[a-zA-Z0-9-_]{3,20}$/g,
  checkPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g,
  checkPhoneNumber: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/g,
  checkMail: /^([\w.-])+@([\w.-])+\.([A-Za-z]{2,4})$/,
  checkName: /^[А-ЯA-Z][a-zа-я-]{1,20}$/g,
};

const checkLoginField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkLogin } = regexp;
    const { value } = input;
    isError = !value.match(checkLogin) || value.length < 3 || value.length > 20;
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkPasswordField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkPassword } = regexp;
    const { value } = input;
    isError =
      !value.match(checkPassword) || value.length < 8 || value.length > 40;
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkPhoneNumberField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkPhoneNumber } = regexp;
    const { value } = input;
    isError =
      !value.match(checkPhoneNumber) || value.length < 10 || value.length > 15;
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkMailField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkMail } = regexp;
    const { value } = input;
    isError = !value.match(checkMail);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkNameField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { checkName } = regexp;
    const { value } = input;
    isError = !value.match(checkName);
    showWarningMessage(input, isError);
  }
  return isError;
};

const checkMessageField = (input: HTMLInputElement): boolean => {
  let isError = false;
  if (input) {
    const { value } = input;
    isError = value === "";
  }
  return isError;
};

export const validation = (data: {
  event?: Event | null;
  input?: HTMLInputElement;
}): boolean => {
  const input = (data.event?.target as HTMLInputElement) || data.input;
  const name = input.name || "text";

  switch (name) {
    case "password":
      return checkPasswordField(input);
    case "login":
      return checkLoginField(input);
    case "email":
      return checkMailField(input);
    case "nickname":
    case "name":
      return checkNameField(input);
    case "phone":
      return checkPhoneNumberField(input);
    case "message":
      return checkMessageField(input);
    default:
      return false;
  }
};

const getFormModel = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');

  if (!inputs || inputs?.length === 0) {
    return;
  }

  const data: Dictionary = [...inputs].reduce(
      (model: Dictionary, input: HTMLInputElement) => {
        const { name, value } = input;
        model[name] = value;
        return model;
      },
      {}
  );

  console.log(data);
};

const checkAllInputsFields = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');
  return [...inputs]
      .map((input) => validation({ input }))
      .every((isError) => isError === false);
};

export const checkAndCollectData = (event: Event, nextRoute?: string) => {
  const form = event.target as HTMLFormElement;
  if (form && checkAllInputsFields(form)) {
    getFormModel(form);
    if (nextRoute) {
      window.location.href = nextRoute;
    }
  }
};

const getInputModel = (input: HTMLInputElement) => {
  if (!input) {
    return;
  }
  const { name, value } = input;
  const result: Dictionary = { [name]: value };
  console.log(result);
};

export const checkAndCollectDataFromInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input && !checkMessageField(input)) {
    getInputModel(input);
  }
};
