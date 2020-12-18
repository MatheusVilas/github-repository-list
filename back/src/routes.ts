import { Router, Request, Response } from "express";
import { Container } from "typedi";
import Auth from "./auth.middleware";
import { Repository } from "./Repository";
import { Login } from "./Login";

const routes = Router();

const repository = Container.get(Repository);
const login = Container.get(Login);

routes.get("/repositories", Auth, (req: Request, resp: Response) =>
  repository.getPublicRepositories(req, resp)
);

routes.get("/login", (req: Request, resp: Response) => login.getUrl(req, resp));

routes.get("/callback", (req: Request, resp: Response) =>
  login.callback(req, resp)
);

export default routes;
