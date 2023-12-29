import { ReactNode, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "../card/card-skeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "../../models/PaginationResponse";
import { ErrorModel } from "../../models/ErrorModel";
import { FeedTypes } from "./FeedTypes";
import { useFeed } from "./Feed.hooks";

type Props<T> = {
  executable: (
    page: number,
    size: number,
    timestamp: Date
  ) => Promise<PaginationResponse<T>> | null;
  ListComponent: React.ComponentType<{ data: T[] }>;
  error: ErrorModel | null;
  endMessage?: ReactNode;
  feedType?: FeedTypes;
  searchParam?: URLSearchParams;
};

const Feed = <T extends object>({
  executable,
  ListComponent,
  error,
  feedType,
  endMessage = (
    <p className="pt-5 px-4 font-semibold">No more data available</p>
  ),
  searchParam,
}: Props<T>) => {
  const { data, loadNext, hasMore } = useFeed<T>(executable);

  console.log("HAS MORE :", hasMore);

  return (
    <>
      <div className="flex flex-col gap-3 p-0 md:p-3 lg:p-0">
        <div role="feed">
          <InfiniteScroll
            dataLength={data.length ?? 0}
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
