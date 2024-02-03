import { AxiosRequestConfig } from "axios";
import { AdlibModel } from "../models/AdlibModel";
import { ApiResponse } from "../models/ApiResponseModel";
import api from "./Api";

const generateAdlib = (
  prompt: string,
  temperature = 0.7,
  topP = 1
): Promise<ApiResponse<AdlibModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/generator/generate",
    method: "POST",
    timeout: 20_000,
    data: {
      prompt,
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

const generateRandomAdlib = (
  temperature = 0.7,
  topP = 1
): Promise<ApiResponse<AdlibModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/generator/generate-random",
    method: "POST",
    timeout: 20_000,
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
  generateRandomAdlib,
};

Object.freeze(GeneratorService);
export default GeneratorService;
