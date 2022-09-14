import formTemplate from './form.tmpl';
import { Block, Dictionary } from '../../utils/block';
import { nanoid } from 'nanoid';

export type TForm = {
    inputs?: Dictionary[];
    btn?: Dictionary;
};

export class Form extends Block {
  constructor(context: { inputs: string[]; btn: string }, events: { submit: (event: Event) => void }) {
    super('div', {
      context: {
        ...context,
        id: nanoid(6),
      },
      template: formTemplate,
      events,
    });
  }
}
