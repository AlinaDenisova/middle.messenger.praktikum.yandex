import popoverHandlerTemplate from './popoverHandler.tmpl';
import { Block } from '../../utils/block';

export type TPopoverHandler = {
    classNameBtn: string;
    classNameImg?: string;
    classNameSpan?: string;
    srcImg?: string,
    descrImg?: string,
    id: string,
};

export class PopoverHandler extends Block {
  constructor(context: TPopoverHandler, events?: { click: (event: Event) => void }) {
    super('div', {
      context: {
        ...context,
      },
      template: popoverHandlerTemplate,
      events,
    });
  }
}
