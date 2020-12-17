import { Router } from "express";
import { Container } from "typedi";
import { Repository } from "./Repository";

const routes = Router();

const repository = Container.get(Repository);

routes.get("/repositories", repository.getPublicRepositories);

export default routes;
