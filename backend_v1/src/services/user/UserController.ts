import { NextFunction, Request, Response } from "express";
import { ErrroHandler } from "../../errors/ErrorHandler";
import { UserRequestTransformer } from "./UserRequestTransformer";
import { PaginationProps } from "../../ts/types/PaginationProps";

export class UserController {
  public async getUserLibs(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationProps = UserRequestTransformer.transformPagination(req);
      const userId = UserRequestTransformer.transformUserId(req);
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }
}
