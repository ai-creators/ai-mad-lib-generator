import express, { Router } from "express";
import { ErrroHandler } from "../errors/ErrorHandler";
import { RouterErrorHandler } from "../errors/RouterErrorHandler";
import { GeneratorController } from "./GeneratorController";

export class GeneratorRouter {
  private static router: Router = express.Router();

  public static init(): Router {
    this.router
      .route("/random-lib")
      .post(GeneratorController.generateRandomLib)
      .all(RouterErrorHandler.methodNotAllowed);
    this.router
      .route("/adlib")
      .post(GeneratorController.generateLib)
      .all(RouterErrorHandler.methodNotAllowed);
    return this.router;
  }
}
