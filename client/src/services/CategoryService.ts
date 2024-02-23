import { ApiResponse } from "@/models/ApiResponseModel";
import { CategoryModel } from "@/models/CategoryModel";
import { FeedTypes } from "@/models/FeedTypes";
import { PaginationResponse } from "@/models/PaginationResponse";
import { AxiosRequestConfig } from "axios";
import api from "./Api";
import { CategoryAggregateModel } from "@/models/CategoryAggregateModel";
import { AdlibModel } from "@/models/AdlibModel";

const getCategories = (
  page: number,
  size: number,
  timestamp: Date,
  feedType: FeedTypes,
  search?: string | undefined
): Promise<ApiResponse<PaginationResponse<CategoryAggregateModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/category",
    params: { timestamp: timestamp.toISOString(), page, size, feedType },
  };

  if (search) {
    config.params.search = search;
  }

  return api.callExternalApi<PaginationResponse<CategoryAggregateModel>>({
    config,
  });
};

const findCategoryByName = (
  name: string
): Promise<ApiResponse<CategoryModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/category/find",
    params: {
      name,
    },
  };

  return api.callExternalApi<CategoryModel>({ config });
};

const getAdlibsByCategoryName = (
  name: string,
  page: number,
  size: number,
  timestamp: Date
): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/category/find/${encodeURIComponent(name)}/adlib`,
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
    },
  };

  return api.callExternalApi<PaginationResponse<AdlibModel>>({ config });
};

const categoryService = {
  getCategories,
  findCategoryByName,
  getAdlibsByCategoryName,
};

Object.freeze(categoryService);
export { categoryService };
