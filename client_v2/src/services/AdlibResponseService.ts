import { AxiosRequestConfig } from "axios";
import { AdlibResponseModel } from "../models/AdlibResponseModel";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";
import { AdlibResponseQuestionModel } from "../models/AdlibResponseQuestionModel";

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

const AdlibResponseService = {
  createAdlibResponse,
  findById,
};

Object.freeze(AdlibResponseService);
export default AdlibResponseService;
