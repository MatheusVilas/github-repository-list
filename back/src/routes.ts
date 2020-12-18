import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { Repository } from "./Repository";

const routes = Router();

const repository = Container.get(Repository);

routes.get("/repositories", (req: Request, resp: Response) =>
  repository.getPublicRepositories(req, resp)
);

export default routes;
