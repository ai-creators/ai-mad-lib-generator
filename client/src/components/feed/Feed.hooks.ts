import { ErrorModel } from "@/models/ErrorModel";
import { PaginationResponse } from "@/models/PaginationResponse";
import { useEffect, useState } from "react";
import { FeedTypes } from "./FeedTypes";
import { useSearchParams } from "react-router-dom";

export const useFeed = <T extends object>(
  executable: (
    page: number,
    size: number,
    timestamp: Date
  ) => Promise<[PaginationResponse<T> | null, ErrorModel | null]>,
  feedType: FeedTypes | null,
  search?: string
) => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());
  const [error, setError] = useState<ErrorModel | null>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const generateMore = async (isStart = false) => {
    const [dataResponse, apiError] = await executable(
      isStart ? 1 : page + 1,
      size,
      timestamp
    );

    if (dataResponse) {
      setPage(dataResponse.page);
      if (dataResponse.page === 1) {
        setData(dataResponse.results);
      } else {
        setData((curr) => [...curr, ...dataResponse.results]);
      }

      if (
        dataResponse.totalPages === 0 ||
        dataResponse.page === dataResponse.totalPages
      ) {
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
    setData([]);
    setError(null);
    setPage(1);
    setIsEnd(false);
    generateMore(true);
  }, [feedType, search, searchParams.get("q")]);

  return { data, error, hasMore, generateMore };
};
