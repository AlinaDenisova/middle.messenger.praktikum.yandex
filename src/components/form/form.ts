import formTemplate from './form.tmpl';
import { Block, Dictionary } from '../../utils';

export type TForm = {
    inputs?: Dictionary[];
    btn?: Dictionary;
    input?: Dictionary;
    error?: string;
};

export class Form extends Block {
  constructor(context: { inputs?: string[]; btn?: string; input?: string; }, events: { submit: (event: Event) => void }) {
    super('div', {
      context: {
        ...context,
      },
      template: formTemplate,
      events,
    });
  }
}
