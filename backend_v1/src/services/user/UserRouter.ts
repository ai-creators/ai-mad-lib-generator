import express, { Router } from "express";
import { UserController } from "./UserController";
import AdLib from "../../db/models/AdLibModel";
import { RouterErrorHandler } from "../../errors/RouterErrorHandler";

export class UserRouter {
  public static init(): Router {
    const controller = new UserController();
    UserRouter.router
      .route("/adlibs")
      .get(controller.getUserLibs)
      .all(RouterErrorHandler.methodNotAllowed);
    return UserRouter.router;
  }

  private static router: Router = express.Router();
}
