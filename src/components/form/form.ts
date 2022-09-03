import formTemplate from "./form.tmpl";
import { Block, Dictionary } from "../../utils/block";
import { nanoid } from "nanoid";

export type TForm = {
  children?: {
    inputs?: Dictionary[];
    button?: Dictionary;
  };
  content?: string;
};

export class Form extends Block {
  constructor(context: TForm, events: Object = {}) {
    super("div", {
      context: {
        ...context,
        id: nanoid(6),
      },
      template: formTemplate,
      events,
    });
  }
}
