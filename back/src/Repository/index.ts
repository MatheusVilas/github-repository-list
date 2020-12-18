import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { RepositoryController } from "./controller";

@Service()
export class Repository {
  @Inject()
  repositoryController: RepositoryController;

  async getPublicRepositories(req: Request, res: Response) {
    try {
      const owner = req.query.owner as string;

      if (!owner) throw new Error("Faltando params");

      const repositories = await this.repositoryController.getRepositories(
        {
          owner,
        },
        false
      );

      res.json(repositories);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
}
