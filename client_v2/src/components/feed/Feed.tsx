import { ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "../card/card-skeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "../../models/PaginationResponse";
import { ErrorModel } from "../../models/ErrorModel";

type Props<T> = {
  executable: (
    page: number,
    size: number,
    timestamp: Date
  ) => Promise<PaginationResponse<T>> | null;
  ListComponent: React.ComponentType<{ data: T[] }>;
  error: ErrorModel | null;
  endMessage?: ReactNode;
};

const Feed = <T extends object>({
  executable,
  ListComponent,
  error,
  endMessage = (
    <p className="pt-5 px-4 font-semibold">No more data available</p>
  ),
}: Props<T>) => {
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());

  const { data } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => executable(page + 1, size, timestamp),
  });

  const loadNext = () => {
    executable(page + 1, size, timestamp);
  };

  const hasMore = () => {
    if (error !== null) {
      return false;
    }

    if (data) {
      return data.page < data.totalPages;
    }

    return true;
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
            hasMore={hasMore()}
            endMessage={endMessage}
          >
            <ListComponent data={data?.results ?? []} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Feed;
