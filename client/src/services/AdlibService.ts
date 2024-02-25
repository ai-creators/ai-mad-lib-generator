import { AdlibModel } from "@/models/AdlibModel";
import { ApiResponse } from "@/models/ApiResponseModel";
import { PaginationResponse } from "@/models/PaginationResponse";
import { AxiosRequestConfig } from "axios";
import api from "./Api";
import { FeedTypes } from "@/models/FeedTypes";
import { storage } from "@/utils/Storage";
import { ContentRating } from "@/models/ContentRating";

const contentRating = storage.get("content-rating") ?? ContentRating.PG;

const getAdlibs = (
  page: number,
  size: number,
  timestamp: Date,
  feedType: FeedTypes = FeedTypes.LATEST,
  search?: string | undefined
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib",
    params: {
      timestamp: timestamp.toISOString(),
      page,
      size,
      feedType,
      contentRating,
    },
  };

  if (search) {
    config.params.search = search;
  }

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const findAdlibById = (adlibId: number): Promise<ApiResponse<AdlibModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib/find",
    params: {
      adlibId,
    },
  };

  return api.callExternalApi<AdlibModel>({ config });
};

const AdlibService = {
  getAdlibs,
  findAdlibById,
};

Object.freeze(AdlibService);
export default AdlibService;
