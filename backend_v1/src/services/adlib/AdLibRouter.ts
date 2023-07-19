import express, { Router } from "express";
import { RouterErrorHandler } from "../../errors/RouterErrorHandler";
import { AdLibController } from "./AdLibController";

export class AdLibRouter {
  public static init(): Router {
    const controller = new AdLibController();
    AdLibRouter.router
      .route("/")
      .get(controller.getLibs)
      .all(RouterErrorHandler.methodNotAllowed);
    return AdLibRouter.router;
  }

  private static router: Router = express.Router();
}
