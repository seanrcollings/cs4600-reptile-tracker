import { Express, Router } from "express";
import { RequestHandler } from "express";
import { ControllerDependancies, Endpoint } from "../types";
import { tokenAuthenticate } from "./middleware/authentication";

interface Route {
  path: string;
  method: "get" | "post" | "put" | "delete";
  endpoint: Endpoint;
  skipAuth?: boolean;
}

export const controller =
  (name: string, routes: Route[]) =>
  (app: Express, deps: ControllerDependancies) => {
    const router = Router({ mergeParams: true });

    routes.forEach((route) => {
      const { path, method, endpoint, skipAuth = false } = route;
      const routeMiddlewares: RequestHandler[] = [];
      if (!skipAuth) routeMiddlewares.push(tokenAuthenticate);

      router[method](path, routeMiddlewares, endpoint(deps));
    });

    app.use(`/${name}`, router);
  };
