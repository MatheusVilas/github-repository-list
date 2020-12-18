import { Response } from "express";
import { Inject, Service } from "typedi";
import { RequestWithUser } from "../auth.middleware";
import { RepositoryController } from "./controller";

@Service()
export class Repository {
  @Inject()
  repositoryController: RepositoryController;

  async getPublicRepositories(req: RequestWithUser, res: Response) {
    try {
      const owner = req.query.owner as string;

      if (!owner) throw new Error("Faltando params");

      const repositories = await this.repositoryController.getRepositories(
        {
          owner,
        },
        req.userToken
      );

      res.json(repositories);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }

  async handleStarRepository(req: RequestWithUser, res: Response) {
    try {
      const fullName = req.body.fullName;
      const token = req.userToken;

      if (!token || !fullName) throw new Error("Faltando params");

      const response = await this.repositoryController.handleStarRepository(
        fullName,
        token
      );

      res.send(response);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
}
