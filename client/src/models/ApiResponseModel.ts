import { ErrorModel } from "./ErrorModel";

export interface ApiResponse<T> {
  data: T | null;
  error: ErrorModel | null;
}
