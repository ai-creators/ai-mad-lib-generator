import { ApiResponse } from "../../models/ApiResponseModel";
import { PaginationResponse } from "../../models/PaginationResponse";

export interface FeedExecutable<T> {
  (
    page: number,
    size: number,
    timestamp: Date,
    abortController?: AbortController
  ): Promise<ApiResponse<PaginationResponse<T>>> | null;
}
