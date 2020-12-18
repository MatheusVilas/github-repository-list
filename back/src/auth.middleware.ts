import { NextFunction, Request, Response } from "express";

export interface RequestWithUser extends Request {
  userToken?: string;
}

export default function Auth(
  req: RequestWithUser,
  _resp: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (authorization && authorization.includes("Bearer")) {
    const [, token] = authorization.split(" ");

    req.userToken = token;
  }

  next();
}
