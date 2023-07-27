import { NextFunction } from "express";
import { MockNextFunction, MockRequest, MockResponse } from "./IMocker";

export class Mocker {
  public static mockRequest<T>(data: T): MockRequest<T> {
    const req = {
      body: {
        data,
      },
    };
    return req;
  }

  public static mockResponse(): MockResponse {
    const res: MockResponse = {
      status: () => res,
      json: () => res,
    };
    return res;
  }

  public static mockNextFunction<T>(obj: T): MockNextFunction {
    const next: NextFunction = (obj) => {};
    return next;
  }
}
