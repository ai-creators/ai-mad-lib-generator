import { useEffect, useState } from "react";
import Lib from "../../../../api/Lib";
import dayjs from "dayjs";
import ApiErrorHandler from "../../../../errors/ApiErrorHandler";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileAdlibsList from "../ProfileAdlibsList/ProfileAdlibsList";
import ErrorAlert from "../../../../errors/ErrorAlert";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileAdlibsFeed = () => {
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timestamp] = useState(new Date());
  const [pagination] = useState(30);
  const [adlibs, setAdlibs] = useState([]);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const getLibs = async () => {
    try {
      setError(null);
      const formattedDate = dayjs(timestamp).format("YYYY-MM-DD");
      const token = await getAccessTokenSilently();
      const response = await Lib.getUserCreated(
        token,
        formattedDate,
        page,
        pagination
      );
      return response.data;
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
        const response = await getLibs();
        setAdlibs(response?.results ?? []);
        setPage(response?.page ?? 1);
        if (response && response.page >= response.totalPages) {
          setIsEnd(true);
        }
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  return (
    <div role="feed">
      <ErrorAlert error={error} setError={setError} className="mt-5" />
      <InfiniteScroll
        dataLength={adlibs.length ?? 0}
        next={loadMoreLibs}
        hasMore={!isEnd && error === null}
        loader={<p className="pt-5 font-semibold">Loading...</p>}
        endMessage={
          <p className="pt-5 font-semibold">No more adlibs available</p>
        }
      >
        <ProfileAdlibsList adlibs={adlibs} />
      </InfiniteScroll>
    </div>
  );
};

export default ProfileAdlibsFeed;
