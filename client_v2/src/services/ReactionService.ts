import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/ApiResponseModel";
import { BookmarkModel } from "../models/BookmarkModel";
import api from "./Api";
import { PaginationResponse } from "../models/PaginationResponse";
import { FeedTypes } from "../components/feed/FeedTypes";
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

const getBookmarks = (
  accountId: string,
  feedType: FeedTypes,
  page: number,
  size: number,
  timestamp: Date,
  accessToken: string,
  abortController?: AbortController
): Promise<ApiResponse<PaginationResponse<BookmarkModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/reaction/bookmark",
    method: "GET",
    params: {
      timestamp: timestamp.toISOString(),
      feedType,
      page,
      size,
      accountId,
    },
    signal: abortController?.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<PaginationResponse<BookmarkModel>>({ config });
};

const getBookmark = (
  accountId: string,
  adlibId: string,
  accessToken: string
): Promise<ApiResponse<BookmarkModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/reaction/bookmark/find",
    method: "GET",
    params: {
      accountId,
      adlibId,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<BookmarkModel>({ config });
};

const ReactionService = {
  bookmarkAdlib,
  getBookmarks,
  getBookmark,
};

Object.freeze(ReactionService);
export default ReactionService;