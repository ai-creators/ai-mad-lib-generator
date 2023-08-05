import { NextFunction, Request, Response } from "express";
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http";
export class HttpMocker {
  public static mockParams(reqConfig: {} = {}, resConfig: {} = {}): any {
    return httpMocks.createMocks(reqConfig, resConfig);
  }

  public static mockRequest(config: {} = {}): MockRequest<any> {
    const req = httpMocks.createRequest(config);
    return req;
  }

  public static mockResponse(): MockResponse<any> {
    const res = httpMocks.createResponse();
    return res;
  }

  public static mockNextFunction(): NextFunction {
    const next: NextFunction = (obj: any) => {
      throw obj;
    };
    return next;
  }
}
