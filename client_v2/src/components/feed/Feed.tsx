import { ComponentType, ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "../card/card-skeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "../../models/PaginationResponse";

type Props<T> = {
  executable: (
    page: number,
    size: number,
    timestamp: Date
  ) => Promise<PaginationResponse<T>> | null;
  ListComponent: React.ComponentType<{ data: T[] }>;
};

const Feed = <T extends object>({ executable, ListComponent }: Props<T>) => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const fetchData = async () => {
    const { isEnd: hasNoMore } = await executable(
      page === 1 ? 1 : page + 1,
      size,
      timestamp
    );

    if (hasNoMore) {
      setIsEnd(true);
    }
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () => excecutable(page + 1, size, timestamp),
    });

  const loadNext = () => {
    executable(page + 1, size, timestamp);
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-0 md:p-3 lg:p-0">
        <div role="feed">
          <InfiniteScroll
            dataLength={data?.results.length ?? 0}
            next={loadNext}
            loader={
              <ul className="flex flex-col gap-5">
                <li>
                  <CardSkeleton />
                </li>
                <li>
                  <CardSkeleton />
                </li>
              </ul>
            }
            hasMore={!isError || isEnd}
            endMessage={
              <p className="pt-5 font-semibold">No more data available</p>
            }
          >
            <ListComponent data={data?.results ?? []} />
          </InfiniteScroll>
        </div>
        {/* <div role="feed">
          <InfiniteScroll
            dataLength={data.length ?? 0}
            next={nextFunction}
            hasMore={!isEnd}
            loader={
              <ul className="flex flex-col gap-5">
                <li>
                  <CardSkeleton />
                </li>
                <li>
                  <CardSkeleton />
                </li>
              </ul>
            }
            endMessage={
              <p className="pt-5 font-semibold">No more adlibs available</p>
            }
          >
            {listComponent}
          </InfiniteScroll>
        </div> */}
      </div>
    </>
  );
};

export default Feed;
