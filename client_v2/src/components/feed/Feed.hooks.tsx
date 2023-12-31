import { useEffect, useState } from "react";
import { FeedExecutable } from "./FeedExecutable";
import { ErrorModel } from "../../models/ErrorModel";
import { FeedTypes } from "./FeedTypes";
import { ApiResponse } from "../../models/ApiResponseModel";
import { PaginationResponse } from "../../models/PaginationResponse";

export const useFeed = <T extends object>(
  executable: FeedExecutable<T>,
  feedType: FeedTypes | null,
  search: string
) => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(5);
  const [timestamp] = useState<Date>(new Date());
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const [data, setData] = useState<T[]>([]);

  const handleResponse = (
    response: ApiResponse<PaginationResponse<T>> | null
  ) => {
    if (response) {
      const { data: paginationResponse, error: errorResponse } = response;

      if (paginationResponse) {
        setData(
          paginationResponse.page === 1 || paginationResponse.page === 0
            ? paginationResponse.results
            : (curr) => [...curr, ...paginationResponse.results]
        );
        setPage(paginationResponse.page);
        if (paginationResponse.page >= paginationResponse.totalPages) {
          setIsEnd(true);
        }
      }

      if (errorResponse) {
        setError(errorResponse);
      }
    }
  };

  const loadNext = async () => {
    handleResponse(await executable(page + 1, size, timestamp));
  };

  const hasMore = (): boolean => {
    if (error || isEnd) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setData([]);
      setIsEnd(false);
      setError(null);
      handleResponse(await executable(1, size, timestamp, abortController));
    })();

    return () => {
      abortController.abort();
    };
  }, [feedType, search]);

  return {
    data,
    loadNext,
    hasMore,
    error,
  };
};
