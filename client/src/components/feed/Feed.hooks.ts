import { ErrorModel } from "@/models/ErrorModel";
import { PaginationResponse } from "@/models/PaginationResponse";
import { useEffect, useState } from "react";
import { FeedTypes } from "./FeedTypes";

export const useFeed = <T extends object>(
  executable: (
    page: number,
    size: number,
    timestamp: Date
  ) => Promise<[PaginationResponse<T> | null, ErrorModel | null]>,
  feedType: FeedTypes | null,
  search?: string
) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());
  const [error, setError] = useState<ErrorModel | null>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const generateMore = async () => {
    const [dataResponse, apiError] = await executable(
      page + 1,
      size,
      timestamp
    );
    if (dataResponse) {
      setPage(dataResponse.page);
      setData((curr) => [...curr, ...dataResponse.results]);
      if (dataResponse.totalPages === 0) {
        setIsEnd(true);
      }
    }
    if (apiError) {
      setError(apiError);
    }
  };

  const hasMore = (): boolean => {
    return !error && !isEnd;
  };

  useEffect(() => {
    generateMore();
  }, [feedType, search]);

  return { data, error, hasMore, generateMore };
};