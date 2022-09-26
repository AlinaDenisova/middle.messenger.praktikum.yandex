import { Dictionary } from "../utils";

const isEqual = (lhs: string, rhs: string) => lhs === rhs;

const render = (block: any) => {
  const app: HTMLElement | null = document.getElementById('app');
  if (app) app.innerHTML = block.transformToString();
};

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
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass(this._props.context);
    render(this._block);
  }
}
