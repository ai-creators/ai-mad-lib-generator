import { AxiosRequestConfig } from "axios";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { PaginationResult } from "@/common/pagination/pagination-result";
import { Adlib } from "../models/adlib.model";

export const getAdlibsFeaturedPaginated = ({
  page,
  size,
  timestamp,
}: {
  page: number;
  size: number;
  timestamp: Date;
}): Promise<PaginationResult<Adlib>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib/featured",
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
    },
  };

  return api(config);
};

export const getAdlibsFeaturedQueryOptions = ({
  page,
  size,
  timestamp,
}: {
  page: number;
  size: number;
  timestamp: Date;
}) => {
  return queryOptions({
    queryKey: ["adlibs-featured", page, size, timestamp],
    queryFn: () => getAdlibsFeaturedPaginated({ page, size, timestamp }),
  });
};

type UseGetAdlibsFeaturedOptions = {
  page: number;
  size: number;
  timestamp: Date;
  queryConfig?: QueryConfig<typeof getAdlibsFeaturedQueryOptions>;
};

export const useAdlibsFeatured = ({
  queryConfig,
  page,
  size,
  timestamp,
}: UseGetAdlibsFeaturedOptions) => {
  return useQuery({
    ...getAdlibsFeaturedQueryOptions({ page, size, timestamp }),
    ...queryConfig,
  });
};
