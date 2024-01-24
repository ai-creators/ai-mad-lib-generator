import { AdlibModel } from "@/models/AdlibModel";
import { ApiResponse } from "@/models/ApiResponseModel";
import { PaginationResponse } from "@/models/PaginationResponse";
import { AxiosRequestConfig } from "axios";
import api from "./Api";
import { FeedTypes } from "@/models/FeedTypes";

const getAdlibs = (
  page: number,
  size: number,
  timestamp: Date,
  feedType: FeedTypes = FeedTypes.LATEST
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib",
    params: {
      timestamp: timestamp.toISOString(),
      page,
      size,
      feedType,
    },
  };

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const AdlibService = {
  getAdlibs,
};

Object.freeze(AdlibService);
export default AdlibService;
