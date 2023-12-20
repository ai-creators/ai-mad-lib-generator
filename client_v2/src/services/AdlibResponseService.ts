import { AxiosRequestConfig } from "axios";
import { AdlibResponseModel } from "../models/AdlibResponseModel";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";

const createAdlibResponse = (
  adlibResponse: AdlibResponseModel
): Promise<ApiResponse<AdlibResponseModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/response",
    method: "POST",
    data: adlibResponse,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<AdlibResponseModel>({ config });
};

const findById = (id: number): Promise<ApiResponse<AdlibResponseModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/response/find",
    params: {
      id,
    },
  };

  return api.callExternalApi<AdlibResponseModel>({ config });
};

const AdlibResponseService = {
  createAdlibResponse,
  findById,
};

Object.freeze(AdlibResponseService);
export default AdlibResponseService;
