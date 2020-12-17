import { Request } from "express";
import { Inject, Service } from "typedi";
import { LoginController } from "./controller";

@Service()
class Login {
  @Inject()
  loginController: LoginController;

  async login(req: Request, res: Response) {}
}
