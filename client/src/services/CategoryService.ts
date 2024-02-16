import { ApiResponse } from "@/models/ApiResponseModel";
import { CategoryModel } from "@/models/CategoryModel";
import { FeedTypes } from "@/models/FeedTypes";
import { PaginationResponse } from "@/models/PaginationResponse";
import { AxiosRequestConfig } from "axios";
import api from "./Api";

const getCategories = (
  page: number,
  size: number,
  timestamp: Date,
  feedType: FeedTypes,
  search?: string | undefined
): Promise<ApiResponse<PaginationResponse<CategoryModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/category",
    params: { timestamp: timestamp.toISOString(), page, size, feedType },
  };

  if (search) {
    config.params.search = search;
  }

  return api.callExternalApi<PaginationResponse<CategoryModel>>({ config });
};

const categoryService = {
  getCategories,
};

Object.freeze(categoryService);
export { categoryService };
