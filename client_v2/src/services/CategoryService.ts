import { AxiosRequestConfig } from "axios";
import { AdlibModel } from "../models/AdlibModel";
import { ApiResponse } from "../models/ApiResponseModel";
import { PaginationResponse } from "../models/PaginationResponse";
import api from "./Api";

const getAdlibsByCategory = (
  category: string,
  timestamp: Date,
  page = 1,
  size = 5
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib/category",
    params: {
      timestamp: timestamp.toISOString(),
      category,
      page,
      size,
    },
  };

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const CategoryService = {
  getAdlibsByCategory,
};

Object.freeze(CategoryService);
export default CategoryService;
