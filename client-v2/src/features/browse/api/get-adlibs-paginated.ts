import { PaginationResult } from "@/common/pagination/pagination-result";
import { Adlib } from "@/features/adlib/models/adlib.model";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { FeedType } from "../models/feed-type";

export const getAdlibsPaginated = ({
  page,
  size,
  timestamp,
  feedType,
}: {
  page: number;
  size: number;
  timestamp: Date;
  feedType: FeedType;
}): Promise<PaginationResult<Adlib>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/adlib",
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
      feedType,
    },
  };

  return api(config);
};

export const getAdlibsPaginatedQueryOptions = ({
  page,
  size,
  timestamp,
  feedType,
}: {
  page: number;
  size: number;
  timestamp: Date;
  feedType: FeedType;
}) => {
  return queryOptions({
    queryKey: ["adlibs", page, size, timestamp, feedType],
    queryFn: () => getAdlibsPaginated({ page, size, timestamp, feedType }),
  });
};

type UseGetAdlibsPaginated = {
  page: number;
  size: number;
  timestamp: Date;
  feedType: FeedType;
  queryConfig?: QueryConfig<typeof getAdlibsPaginated>;
};

export const useAdlibsPaginated = ({
  queryConfig,
  page,
  size,
  feedType,
  timestamp,
}: UseGetAdlibsPaginated) => {
  return useQuery({
    ...getAdlibsPaginatedQueryOptions({ page, size, timestamp, feedType }),
    ...queryConfig,
  });
};
