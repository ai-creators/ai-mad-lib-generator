import express, { Router } from "express";
import { RouterErrorHandler } from "../../errors/RouterErrorHandler";

export class AdLibRouter {
  public static init(): Router {
    this.router.route("/list").all(RouterErrorHandler.methodNotAllowed);
    return this.router;
  }

  private static router: Router = express.Router();
}
