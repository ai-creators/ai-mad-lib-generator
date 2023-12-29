import { AxiosRequestConfig } from "axios";
import { AdlibModel } from "../models/AdlibModel";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";

const generateAdlib = (
  prompt: string,
  accountId?: number | null,
  temperature = 0.7,
  topP = 1
): Promise<ApiResponse<AdlibModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/generator/generate",
    method: "POST",
    data: {
      prompt,
      userId: accountId,
    },
    params: {
      temperature,
      topP,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return api.callExternalApi<AdlibModel>({ config });
};

const GeneratorService = {
  generateAdlib,
};

Object.freeze(GeneratorService);
export default GeneratorService;
