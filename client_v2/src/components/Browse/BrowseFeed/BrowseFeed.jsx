import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Lib from "../../../api/Lib";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";
import InfiniteScroll from "react-infinite-scroll-component";
import BrowseList from "../BrowseList/BrowseList";

const BrowseFeed = ({ search, type, error, setError, adlibs, setAdlibs }) => {
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timestamp] = useState(new Date());
  const [size] = useState(30);

  const getLibs = async (isStart) => {
    try {
      setIsLoading(true);
      setError(null);
      const formattedDate = dayjs(timestamp).format("YYYY-MM-DD");
      const nextPage = isStart ? 1 : page + 1;
      if (type === "featured") {
        const response = await Lib.getFeatured(formattedDate, 1, 10);
        setIsEnd(true);
        return response.data;
      } else if (search) {
        const response = await Lib.search(
          formattedDate,
          search,
          nextPage,
          size
        );
        return response.data;
      } else {
        const response = await Lib.get(formattedDate, nextPage, size);
        return response.data;
      }
    } catch (e) {
      setError(ApiErrorHandler.handleRequestResponse(e));
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreLibs = async () => {
    try {
      const response = await getLibs();
      if (response?.results) {
        setAdlibs((curr) => [...curr, ...response.results]);
      }
      setPage((curr) => response?.page ?? curr + 1);
      if (response.page >= response.totalPages) {
        setIsEnd(true);
      }
    } catch (e) {
      setError(ApiErrorHandler.handleRequestResponse(e));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsEnd(false);
        setAdlibs([]);
        const response = await getLibs(true);
        setAdlibs(response?.results ?? []);
        setPage(response?.page ?? 1);
        if (response && response.page >= response.totalPages) {
          setIsEnd(true);
        }
      } catch (e) {
        setError(e);
      }
    })();
  }, [search, type]);

  return (
    <div role="feed">
      <InfiniteScroll
        dataLength={adlibs.length ?? 0}
        next={loadMoreLibs}
        hasMore={!isEnd || error !== null}
        loader={<p className="pt-5 font-semibold">Loading...</p>}
        endMessage={
          <p className="pt-5 font-semibold">No more adlibs available</p>
        }
      >
        <BrowseList adlibs={adlibs ?? []} />
      </InfiniteScroll>
    </div>
  );
};

export default BrowseFeed;
