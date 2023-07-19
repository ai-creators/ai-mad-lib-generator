import { NextFunction, Request, Response } from "express";
import { ErrroHandler } from "./ErrorHandler";

export class RouterErrorHandler extends ErrroHandler {
  public static methodNotAllowed(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    return next({
      status: 405,
      message: `${req.method} not allowed for ${req.originalUrl}`,
    });
  }

  public static notFound(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    return next({
      status: 404,
      message: `Path not found: ${req.originalUrl}`,
    });
  }

  public static handler(
    error: {
      status: number;
      message: string;
    },
    req: Request,
    res: Response,
    next: NextFunction
  ): Response {
    const { status = 500, message = "Something went wrong!" } = error;
    res.setHeader("Content-Type", "application/json");
    return res.status(status).json({ error: message });
  }
}
