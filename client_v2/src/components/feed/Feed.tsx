import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "../card/card-skeleton/CardSkeleton";
import { FeedTypes } from "./FeedTypes";
import { useFeed } from "./Feed.hooks";
import { FeedExecutable } from "./FeedExecutable";
import ErrorAlert from "../errors/ErrorAlert";

type Props<T> = {
  executable: FeedExecutable<T>;
  ListComponent: React.ComponentType<{ data: T[] }>;
  endMessage?: ReactNode;
  feedType?: FeedTypes | null;
  search?: string;
};

const Feed = <T extends object>({
  executable,
  ListComponent,
  feedType = null,
  endMessage = (
    <p className="pt-5 px-4 font-semibold">No more data available</p>
  ),
  search = "",
}: Props<T>) => {
  const { data, loadNext, hasMore, error } = useFeed<T>(
    executable,
    feedType,
    search
  );

  return (
    <>
      <div className="flex flex-col gap-3 p-0 md:p-3 lg:p-0">
        <ErrorAlert error={error} />
        <div role="feed">
          <InfiniteScroll
            dataLength={data.length ?? 0}
            next={loadNext}
            loader={
              <ul className="flex flex-col gap-5 mt-5">
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
            <ListComponent data={data ?? []} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Feed;
