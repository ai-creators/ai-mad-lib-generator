import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";
import { AdlibTypes } from "../models/AdlibTypes";
import { AdlibModel } from "../models/AdlibModel";
import { PaginationResponse } from "../models/PaginationResponse";

const getAdlibs = (
  timestamp: Date,
  type: AdlibTypes,
  page = 1,
  size = 5
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/adlib",
    params: {
      timestamp: timestamp.toISOString,
      type,
      page,
      size,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const AdlibService = {
  getAdlibs,
};

Object.freeze(AdlibService);
export default AdlibService;
