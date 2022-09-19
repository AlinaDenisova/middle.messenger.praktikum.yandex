import formTemplate from './form.tmpl';
import { Block, Dictionary } from '../../utils/block';

export type TForm = {
    inputs?: Dictionary[];
    btn?: Dictionary;
};

export class Form extends Block {
  constructor(context: { inputs: string[]; btn: string }, events: { submit: (event: Event) => void }) {
    super('div', {
      context: {
        ...context,
      },
      template: formTemplate,
      events,
    });
  }
}
