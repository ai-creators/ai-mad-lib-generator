import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";
import { AdlibModel } from "../models/AdlibModel";
import { PaginationResponse } from "../models/PaginationResponse";
import { FeedTypes } from "../components/feed/FeedTypes";
import storage from "../utils/Storage";

const getAdlibs = (
  feedType: FeedTypes,
  page = 1,
  size = 25,
  timestamp: Date,
  abortController?: AbortController,
  search?: string
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const isPg: boolean = storage.get("isPg");
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib",
    method: "GET",
    params: {
      timestamp: timestamp.toISOString(),
      feedType,
      page,
      size,
      search,
      isPg,
    },
    signal: abortController?.signal,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const findAdlibById = (id: string): Promise<ApiResponse<AdlibModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib/find",
    method: "GET",
    params: {
      id,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<AdlibModel>({ config });
};

const getAdlibsByUsername = (
  username: string,
  timestamp: Date,
  abortController?: AbortController,
  page = 1,
  size = 5
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/adlib/find/username/${encodeURI(username)}`,
    params: {
      page,
      size,
      timestamp,
    },
    signal: abortController?.signal,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const AdlibService = {
  getAdlibs,
  findAdlibById,
  getAdlibsByUsername,
};

Object.freeze(AdlibService);
export default AdlibService;
