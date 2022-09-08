import popoverTemplate from './popover.tmpl';
import { Block, Dictionary } from '../../utils/block';
import "./popover.scss";

export type TPopover = {
    popoverItems?: Dictionary[];
    className: string,
};

export class Popover extends Block {
  constructor(context: { popoverItems: string[], className: string }, events: object = {}) {
    super('div', {
      context: {
        ...context,
      },
      template: popoverTemplate,
      events,
    });
  }
}
