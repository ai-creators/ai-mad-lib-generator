import { NextFunction, Request, Response } from "express";

export class Mocker {
  public static mockParams(): {
    req: Request;
    res: Response;
    next: NextFunction;
  } {
    return {
      req: Mocker.mockRequest(),
      res: Mocker.mockResponse(),
      next: Mocker.mockNextFunction(),
    };
  }

  public static mockRequest(): Request {
    return {
      body: {
        data: {},
      },
    } as Request;
  }

  public static mockResponse(): Response {
    return {} as Response;
  }

  public static mockNextFunction(): NextFunction {
    const next: NextFunction = (obj: any) => {
      throw obj;
    };
    return next;
  }
}
