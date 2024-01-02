import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/ApiResponseModel";
import { BookmarkModel } from "../models/BookmarkModel";
import api from "./Api";

const bookmarkAdlib = (
  adlibId: string,
  accountId: string | null,
  abortController?: AbortController
): Promise<ApiResponse<BookmarkModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/reaction/bookmark",
    method: "POST",
    data: {
      adlibId,
      accountId,
    },
    signal: abortController?.signal,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<BookmarkModel>({ config });
};

const ReactionService = {
  bookmarkAdlib,
};

Object.freeze(ReactionService);
export default ReactionService;
