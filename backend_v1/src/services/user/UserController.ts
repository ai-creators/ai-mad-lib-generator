import { NextFunction } from "express";
import { ErrroHandler } from "../../errors/ErrorHandler";

export class UserController {
  public async getUserLibs(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }
}
