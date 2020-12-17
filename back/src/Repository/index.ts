import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { RepositoryController } from "./controller";

@Service()
export class Repository {
  @Inject()
  repositoryController: RepositoryController;

  async getPublicRepositories(req: Request, res: Response) {
    try {
      const repositories = await this.repositoryController.getRepositories();

      res.json(repositories);
    } catch (error) {
      res.status(401).send(error);
    }
  }
}
