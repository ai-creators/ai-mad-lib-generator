import { AxiosRequestConfig } from "axios";
import { AdlibResponseModel } from "../models/AdlibResponseModel";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";
import { AdlibResponseQuestionModel } from "../models/AdlibResponseQuestionModel";
import { AdlibModel } from "../models/AdlibModel";
import { PaginationResponse } from "../models/PaginationResponse";

const createAdlibResponse = (
  adlibId: string,
  questions: AdlibResponseQuestionModel[],
  createdById: string | null
): Promise<ApiResponse<AdlibResponseModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/response",
    method: "POST",
    data: {
      adlibId,
      questions,
      createdById,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<AdlibResponseModel>({ config });
};

const findById = (id: string): Promise<ApiResponse<AdlibResponseModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/response/find",
    params: {
      id,
    },
  };

  return api.callExternalApi<AdlibResponseModel>({ config });
};

const findResponsesByAdlibId = (
  id: string,
  page: number,
  size: number,
  timestamp: Date,
  abortController?: AbortController
): Promise<
  ApiResponse<{
    adlib: AdlibModel;
    results: PaginationResponse<AdlibResponseModel>;
  }>
> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/response/adlib/find",
    method: "GET",
    params: {
      id,
      page,
      size,
      timestamp,
    },
    signal: abortController?.signal,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<{
    adlib: AdlibModel;
    results: PaginationResponse<AdlibResponseModel>;
  }>({
    config,
  });
};

const AdlibResponseService = {
  createAdlibResponse,
  findById,
  findResponsesByAdlibId,
};

Object.freeze(AdlibResponseService);
export default AdlibResponseService;
