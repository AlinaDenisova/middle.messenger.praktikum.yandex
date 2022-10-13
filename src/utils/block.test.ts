import { expect } from 'chai';
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
    dataId: "newId",
  });

  it('should fire init event on initialization', () => {
    let res = mock.getContent().innerHTML;
    expect(res).to.eq('<div data-id="newId"></div>');
  });
});

