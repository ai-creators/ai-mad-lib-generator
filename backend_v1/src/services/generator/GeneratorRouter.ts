import express, { Router } from "express";
import { ErrroHandler } from "../../errors/ErrorHandler";
import { RouterErrorHandler } from "../../errors/RouterErrorHandler";
import { GeneratorController } from "./GeneratorController";

export class GeneratorRouter {
  public static init(): Router {
    const controller = new GeneratorController();
    this.router
      .route("/random-adlib")
      .post(controller.generateRandomLib)
      .all(RouterErrorHandler.methodNotAllowed);
    this.router
      .route("/adlib")
      .post(controller.generateLib)
      .all(RouterErrorHandler.methodNotAllowed);
    return this.router;
  }

  private static router: Router = express.Router();
}
