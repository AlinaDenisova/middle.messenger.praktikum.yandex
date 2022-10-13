import { expect } from 'chai';
import { Btn, TBtn } from './btn';

describe('Button component tests', () => {

  const createButton = (context: TBtn) => {
    const btn = new Btn(context);
    return btn.transformToString();
  };

  it('should render button', () => {
    const context = {
      title: 'Отмена',
      btnClassName: 'back-chat-button',
      btnType: 'button',
    };
    const btn = createButton(context);
    expect(btn).to.not.be.null;
  });
});
