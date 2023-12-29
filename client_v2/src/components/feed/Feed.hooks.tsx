import { useEffect, useState } from "react";

export const useFeed = <T extends object>() => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());

  const [data, setData] = useState<T[]>([]);

  const loadNext = () => {};

  const hasMore = (): boolean => {};

  useEffect(() => {}, []);

  return {
    data,
    loadNext,
    hasMore,
  };
};
