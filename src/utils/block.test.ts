import { expect } from 'chai';
import { assert } from "chai";
import {Block} from "./block";
import Handlebars from "handlebars";

describe("Block", () => {
  type Props = {
    dataId: string;
  };

  const getTemplate = (dataId: string) => {
    const template = Handlebars.compile(`<div data-id="{{dataId}}"></div>`);
    const context = {
      dataId: dataId,
    };
    return template(context);
  };

  class Mock extends Block {
    constructor(context: Props, events = {}) {
      super("div", {
        context: {
          ...context,
        },
        template: getTemplate(context.dataId),
        events,
      });
    }
  }

  const mock = new Mock({
    dataId: "old",
  });

  it("Создаем экземпляр класса", () => {
    expect(mock.props.context.dataId).to.eq("old");
  });

  it("Задаем новые пропсы", () => {
    mock.setProps({
        dataId: "new"
    });
    assert.equal(mock.props.dataId, "new");
  });

  it('Сам компонент с новыми пропсами <div data-id="new"></div>', () => {
    let res = mock.getContent().innerHTML;
    assert.equal(res, '<div data-id="new"></div>');
  });
});

