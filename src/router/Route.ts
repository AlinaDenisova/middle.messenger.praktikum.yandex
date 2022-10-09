import { Dictionary } from "../utils/block";
import { render } from '../utils/helpers';

export interface IRoute {
  navigate(pathname: string): void;
  leave(): void;
  match(pathname: string): boolean;
  render(): void;
}

export class Route {
  private _pathname: string;

  private _blockClass: any;

  private _block: null | Dictionary;

  private _props: Dictionary;

  constructor(pathname: string, view: Dictionary, props: Dictionary) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string) {
    return pathname ===this._pathname;
  }

  render() {
    this._block = new this._blockClass(this._props.context);
    render(this._block);
  }
}
