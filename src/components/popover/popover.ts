import popoverTemplate from './popover.tmpl';
import { Block, Dictionary } from '../../utils/block';
import './popover.scss';

export type TPopover = {
  children?: {
    popoverItems: Dictionary;
  };
  popoverClassName: string,
  content?: string;
};

export class Popover extends Block {
  constructor(context: TPopover, events: Object = {}) {
    super('div', {
      context: {
        ...context,
        popoverClassName: context.popoverClassName
      },
      template: popoverTemplate,
      events,
    });
  }
}
