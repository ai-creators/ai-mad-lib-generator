import { NextFunction, Request, Response } from "express";
import { ErrroHandler } from "./ErrorHandler";

export class RouterErrorHandler extends ErrroHandler {
  public static methodNotAllowed(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    next({
      status: 405,
      message: `${req.method} not allowed for ${req.originalUrl}`,
    });
  }
}
