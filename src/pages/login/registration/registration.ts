import * as Handlebars from 'handlebars';
import registrationTemplate from './registration.tmpl';
import { Input } from '../../../components/input';
import { Btn } from '../../../components/btn'
import { Form } from '../../../components/form';
import { Link } from '../../../components/link';

export function registration() {
  const template = Handlebars.compile(registrationTemplate);

  const inputs = [
    new Input(
      {
        name: 'email',
        label: 'Почта',
        type: 'text',
        required: true,
        errorMessage:
          'Адрес электронной почты содержит ошибки',
      }
    ),
    new Input(
      {
        name: 'login',
        label: 'Логин',
        type: 'text',
        required: true,
        errorMessage:
          'Длина логина 3-20символов',
      }
    ),
    new Input(
      {
        name: 'name',
        label: 'Имя',
        type: 'text',
        required: false,
        errorMessage:
          'В имени не допускается использование цифр или символов',
      }
    ),
    new Input(
      {
        name: 'lastName',
        label: 'Фамилия',
        type: 'text',
        required: false,
        errorMessage:
          'В фамилии не допускается использование цифр или символов',
      }
    ),
    new Input(
      {
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        required: false,
        errorMessage:
          'Введите номер в международном формате, например: +7..',
      }
    ),
    new Input(
      {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true,
        errorMessage:
          'Длина пароля 8-40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
      }
    ),
    new Input(
      {
        name: 'secondPassword',
        label: 'Пароль (ещё раз)',
        type: 'password',
        required: true,
        errorMessage: 'Введенные пароли не совпадают',
      }
    ),
  ];

  const button = new Btn({
      btnText: 'Зарегистрироваться',
      btnClassName: 'login',
  });

  const link = new Link({
      linkText: 'Войти',
      linkHref: '/registration',
  });

  const context = {
    inputs: inputs.map((input) => input.transformToString()),
    btn: button.transformToString(),
    link: link.transformToString(),

  };

  const form = new Form(
    {
      children: {
        inputs,
        button,
      },
      content: template(context),
    }
  );

  return form.transformToString();
}
