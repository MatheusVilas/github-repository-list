import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { LoginController } from "./controller";

@Service()
export class Login {
  @Inject()
  loginController: LoginController;

  async getUrl(_req: Request, res: Response) {
    const url = await this.loginController.getAuthorizationURL();

    res.redirect(url);
  }

  async callback(req: Request, res: Response) {
    try {
      const code = req.query.code as string;

      if (!code) throw new Error("Faltando params");

      const userData = await this.loginController.getUserData(code);

      res.redirect(`${process.env.FRONT_END_URL}?${userData}`);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
}
