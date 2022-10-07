import { expect } from 'chai';
import { Btn, TBtn } from './btn';

describe('Button component tests', () => {
  beforeEach(() => {
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(
      '<!DOCTYPE html><html><head></head><body><div id="app"></div></body></html>'
    );

    global.window = dom.window;
    global.document = dom.window.document;
  });

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
