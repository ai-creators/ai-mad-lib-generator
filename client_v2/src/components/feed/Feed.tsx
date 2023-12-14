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
    setError(null);
    const { data, error } = await AdlibService.getAdlibs(
      timestamp,
      feedType,
      page + 1,
      size
    );
    console.log("ERROR: ", error);

    if (error) {
      setError(error);
    }

    return data;
  };

  const loadMoreAdlibs = async () => {
    const data = await getAdlibs();
    if (data?.results) {
      setAdlibs((curr) => [...curr, ...data.results]);
    }
    if (data?.page) {
      setPage(data.page);
    }
    if (data?.page && data.page >= data?.totalPages) {
      setIsEnd(true);
    }
  };

  useEffect(() => {
    (async () => {
      setIsEnd(false);
      const data = await getAdlibs();
      if (data?.results) {
        setAdlibs(data.results);
      }
      if (data?.page && data.page >= data?.totalPages) {
        setIsEnd(true);
      }
    })();
  }, [feedType]);

  return (
    <>
      <ErrorAlert error={error} setError={setError} />
      <div className="flex flex-col gap-3">
        <FeedNav feedType={feedType} setFeedType={setFeedType} />
        <div role="feed">
          <InfiniteScroll
            dataLength={adlibs.length ?? 0}
            next={loadMoreAdlibs}
            hasMore={!isEnd || error === null}
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
