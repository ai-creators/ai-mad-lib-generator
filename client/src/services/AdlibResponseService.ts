import { AdlibResponseModel } from "@/models/AdlibResponseModel";
import { AdlibResponseQuestionModel } from "@/models/AdlibResponseQuestionModel";
import { ApiResponse } from "@/models/ApiResponseModel";
import { AxiosRequestConfig } from "axios";
import api from "./Api";

const createResponse = (
  adlibId: number,
  questions: AdlibResponseQuestionModel[]
): Promise<ApiResponse<AdlibResponseModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/response",
    method: "POST",
    data: {
      adlibId,
      questions,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<AdlibResponseModel>({ config });
};

const findById = (
  adlibResponseId: number
): Promise<ApiResponse<AdlibResponseModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/response/find",
    params: {
      id: adlibResponseId,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<AdlibResponseModel>({ config });
};

const adlibResponseService = {
  createResponse,
  findById,
};

Object.freeze(adlibResponseService);
export { adlibResponseService };
