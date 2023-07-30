import { NextFunction, Request, Response } from "express";

export interface MockResponse extends Response {}

export interface MockRequest<T> extends Request {
  body: {
    data: T;
  };
}

export interface MockNextFunction extends NextFunction {
  (err?: any): void;
  (deferToNext: "router"): void;
  (deferToNext: "route"): void;
}
