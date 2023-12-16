import { useEffect, useState } from "react";
import { FeedTypes } from "./FeedTypes";
import FeedNav from "./feed-nav/FeedNav";
import { ErrorModel } from "../../models/ErrorModel";
import { AdlibModel } from "../../models/AdlibModel";
import AdlibService from "../../services/AdlibService";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedList from "./feed-list/FeedList";
import CardSkeleton from "../card/card-skeleton/CardSkeleton";
import ErrorAlert from "../errors/ErrorAlert";

const Feed = () => {
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.FEATURED);

  const [error, setError] = useState<ErrorModel | null>(null);
  const [adlibs, setAdlibs] = useState<AdlibModel[]>([]);

  const [page, setPage] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [timestamp] = useState<Date>(new Date());
  const [size] = useState<number>(25);

  const getAdlibs = async () => {
    const response = await AdlibService.getAdlibs(
      timestamp,
      feedType,
      page + 1,
      size
    );
    return response;
  };

  const loadMoreAdlibs = async () => {
    if (!isEnd) {
      const { data, error } = await getAdlibs();
      if (data?.results) {
        setAdlibs((curr) => [...curr, ...data.results]);
      }
      if (data?.page) {
        setPage(data.page);
      }
      if (data?.page && data.page >= data?.totalPages) {
        console.log("IS AT END");
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
      const { data, error } = await getAdlibs();
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

  console.log(isEnd, error, adlibs.length);

  return (
    <>
      <ErrorAlert error={error} setError={setError} />
      <div className="flex flex-col gap-3 p-0 md:p-3 lg:p-0">
        <FeedNav feedType={feedType} setFeedType={setFeedType} />
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
