import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationResponse } from "@/models/PaginationResponse";
import { useFeed } from "./Feed.hooks";
import { ErrorModel } from "@/models/ErrorModel";
import ErrorAlert from "@/errors/ErrorAlert";
import { ReactNode } from "react";
import { FeedTypes } from "./FeedTypes";

type Props<T> = {
  executable: (
    page: number,
    size: number,
    timestamp: Date
  ) => Promise<[PaginationResponse<T>, ErrorModel | null]>;
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
  const { data, hasMore, generateMore, error } = useFeed<T>(
    executable,
    feedType,
    search
  );
  return (
    <div className="flex flex-col gap-3 p-0 md:p-3 lg:p-0">
      <ErrorAlert error={error} />
      <div role="feed">
        <InfiniteScroll
          dataLength={data.length ?? 0}
          next={generateMore}
          loader={
            <ul>
              <li>LOADING</li>
            </ul>
          }
          hasMore={hasMore()}
          endMessage={endMessage}
        >
          <ListComponent data={data ?? []} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;
