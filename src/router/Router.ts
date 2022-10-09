import { Dictionary } from "../utils";
import { routes } from "../utils";

import { Route, IRoute } from "./Route";

export interface IRouter {
  use(pathname: string, block: Dictionary, context: Dictionary): IRouter;
  start(): void;
  go(pathname?: string): void;
  getCurrentRoute(): void;
  back(): void;
  back(): void;
  forward(): void;
  routes(): IRoute[];
}

export class Router {
  routes: IRoute[];

  history: History;

  private _currentRoute: IRoute | undefined;

 private _rootQuery: string;

  static __instance: Router | null;

  notFoundRoute: IRoute | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = undefined;

    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Dictionary, context: Dictionary = {}) {
    const route: IRoute = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      context,
    });
    this.routes.push(route);
    return this;
  }

  notFound(block: Dictionary, context: Dictionary = {}) {
    this.notFoundRoute = new Route(`/${routes.notFound}`, block, {
      rootQuery: this._rootQuery,
      context,
    });
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent & { currentTarget: Window }) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    if (!route) {
      this.notFoundRoute?.navigate(`/${routes.notFound}`);
    } else {
      this._currentRoute = route;

      try {
        route.navigate(pathname);
      } catch (e) {
        this._currentRoute = this.notFoundRoute;
        this.notFoundRoute?.navigate(`/${routes.notFound}`);
      }
    }
  }

  go(pathname?: string) {
    if (pathname) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    } else {
      this.history.go();
    }
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  getCurrentRoute() {
    return this._currentRoute;
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}

export default new Router('#app');
