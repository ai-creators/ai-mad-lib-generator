import { useEffect, useState } from "react";
import { ErrorModel } from "../../models/ErrorModel";
import { AdlibModel } from "../../models/AdlibModel";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedList from "./feed-list/FeedList";
import CardSkeleton from "../card/card-skeleton/CardSkeleton";
import ErrorAlert from "../errors/ErrorAlert";
import { PaginationResponse } from "../../models/PaginationResponse";
import { ApiResponse } from "../../models/ApiResponseModel";

type Props = {
  executable: () => Promise<ApiResponse<PaginationResponse<AdlibModel>>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  header: React.ReactNode;
  feedType: string;
};

const Feed = ({ executable, header, setPage, feedType }: Props) => {
  const [error, setError] = useState<ErrorModel | null>(null);
  const [adlibs, setAdlibs] = useState<AdlibModel[]>([]);

  const [isEnd, setIsEnd] = useState<boolean>(false);

  const loadMoreAdlibs = async () => {
    if (!isEnd) {
      const { data, error } = await executable();
      if (data?.results) {
        setAdlibs((curr) => [...curr, ...data.results]);
      }
      if (data?.page) {
        setPage(data.page);
      }
      if (data?.page && data.page >= data?.totalPages) {
        setIsEnd(true);
      }
      if (error) {
        setError(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setIsEnd(false);
      setError(null);
      setAdlibs([]);
      const { data, error } = await executable();
      if (data?.results) {
        setAdlibs(data.results);
      }
      if (data?.page && data.page >= data?.totalPages) {
        setIsEnd(true);
      }
      if (error) {
        setError(error);
      }
    })();
  }, [feedType]);

  return (
    <>
      <ErrorAlert error={error} setError={setError} />
      <div className="flex flex-col gap-3 p-0 md:p-3 lg:p-0">
        {header}
        <div role="feed">
          <InfiniteScroll
            dataLength={adlibs.length ?? 0}
            next={loadMoreAdlibs}
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
            <FeedList adlibs={adlibs ?? []} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Feed;
