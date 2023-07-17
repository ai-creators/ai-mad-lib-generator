import { Response } from "express";

export abstract class Controller {
  public static sendResponse(
    res: Response,
    data: any,
    status: number
  ): Response {
    return res.status(status).json(data);
  }
}
