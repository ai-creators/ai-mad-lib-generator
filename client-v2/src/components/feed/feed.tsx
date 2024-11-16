import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationResult } from "@/common/pagination/pagination-result";
import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext, useState } from "react";

export type FeedProps = {
  endMessage?: ReactNode;
  loader?: ReactNode;
  children?: ReactNode;
  useQuery: (
    paginationState: FeedState
  ) => UseInfiniteQueryResult<PaginationResult<any>>;
};

type FeedState = {
  page: number;
  size: number;
  timestamp: Date;
};

const initialState: FeedState = {
  page: 1,
  size: 25,
  timestamp: new Date(),
};

const FeedContext = createContext<FeedState>(initialState);

const Feed = ({ children, useQuery, endMessage, loader }: FeedProps) => {
  const [paginationState, setPaginationState] =
    useState<FeedState>(initialState);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useQuery(paginationState);

  const handleLoadMore = () => {
    if (hasNextPage) {
      setPaginationState((prevState) => ({
        ...prevState,
        page: prevState.page + 1,
      }));
      fetchNextPage();
    }
  };

  return (
    <FeedContext.Provider value={paginationState}>
      <div role="feed">
        <InfiniteScroll
          dataLength={data?.results.length ?? 0}
          next={handleLoadMore}
          loader={loader}
          hasMore={!!hasNextPage}
          endMessage={endMessage}
        >
          {children}
        </InfiniteScroll>
      </div>
    </FeedContext.Provider>
  );
};

export const useFeed = () => {
  const context = useContext(FeedContext);

  if (context === undefined) {
    throw new Error("useFeed must be used within feed/feed provider");
  }

  return context;
};

export default Feed;
