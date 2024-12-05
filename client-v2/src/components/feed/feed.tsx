import InfiniteScroll from "react-infinite-scroll-component";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";

export type FeedProps = {
  endMessage?: ReactNode;
  loader?: ReactNode;
  children?: ReactNode;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
  dataLength: number;
};

type FeedState = {
  page: number;
};

const initialState: FeedState = {
  page: 1,
};

const FeedContext = createContext<FeedState>(initialState);

const Feed = ({
  children,
  endMessage,
  loader,
  page,
  setPage,
  hasNextPage,
  dataLength,
}: FeedProps) => {
  const handleLoadMore = () => {
    if (hasNextPage) {
      setPage((curr) => curr + 1);
    }
  };

  const value = {
    page,
  };

  return (
    <FeedContext.Provider value={value}>
      <div role="feed">
        <InfiniteScroll
          dataLength={dataLength}
          next={handleLoadMore}
          loader={loader}
          hasMore={hasNextPage}
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
