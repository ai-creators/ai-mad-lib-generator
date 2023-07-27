export interface MockResponse {
  status: () => MockResponse;
  json: () => MockResponse;
}

export interface MockRequest<T> {
  body: {
    data: T;
  };
}

export interface MockNextFunction {
  (err?: any): void;
  (deferToNext: "router"): void;
  (deferToNext: "route"): void;
}
