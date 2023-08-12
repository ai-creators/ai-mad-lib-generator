import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../Card/Card";
import dayjs from "dayjs";
import Lib from "../../../api/Lib";
import Loader from "../../Loader/Loader";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";

const BrowseLibs = ({ search, setSearch }) => {
  const [type, setType] = useState("featured");
  const [libs, setLibs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timestamp] = useState(new Date());
  const [page, setPage] = useState(1);
  const [pagination] = useState(30);
  const changeType = ({ target: { id } }) => {
    if (search) {
      setSearch("");
    }
    setType(id);
  };

  useEffect(() => {
    setIsLoading(false);
    setPage(1);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const formattedDate = dayjs(timestamp).format("YYYY-MM-DD");
        const response = await (search
          ? Lib.search(formattedDate, search, `${page}`, `${pagination}`)
          : Lib.get(formattedDate, type, `${page}`, `${pagination}`));
        if (response.data.page === 1 && response.data.results) {
          setLibs(response.data.results);
        } else {
          setLibs((curr) => [...curr, ...response.data.results]);
        }
      } catch (e) {
        setError(ApiErrorHandler.handleRequestResponse(e));
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [type, search]);

  return (
    <Card className="flex flex-col gap-3" useForSmall>
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold capitalize">{type}...</h3>
          <p className="text-zinc-400">View {type} Ad-Libs</p>
        </div>

        <ul className="flex gap-3">
          <li>
            <button
              className={`py-2.5 w-24 ${
                type === "featured" ? "bg-zinc-900" : ""
              } hover:bg-zinc-900 active:bg-zinc-700 ease-out duration-200 rounded`}
              id="featured"
              onClick={changeType}
            >
              Featured
            </button>
          </li>
          <li>
            <button
              className={`py-2.5 w-24 ${
                type === "newest" ? "bg-zinc-900" : ""
              } hover:bg-zinc-900 active:bg-zinc-700 ease-out duration-200 rounded`}
              id="newest"
              onClick={changeType}
            >
              Newest
            </button>
          </li>
          <li>
            <button
              className={`py-2.5 w-24 ${
                type === "interesting" ? "bg-zinc-900" : ""
              } hover:bg-zinc-900 active:bg-zinc-700 ease-out duration-200 rounded`}
              id="interesting"
              onClick={changeType}
            >
              Interesting
            </button>
          </li>
        </ul>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <p className="font-bold">Error Loading Featured Ad-Libs</p>
      ) : (
        <ul className="flex flex-col gap-5 max-w-[100%]">
          {libs.map((lib) => {
            return (
              <li key={lib._id}>
                <div className="border border-zinc-600 text-white p-5 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h6 className="text-xl font-semibold whitespace-wrap max-w-[75%]">
                      {lib.prompt}
                    </h6>
                    <p className="text-zinc-400">
                      {dayjs(lib.createdAt).format("MMM, D")}
                    </p>
                  </div>

                  <Link
                    to="/libs/play"
                    className="p-3 rounded border border-zinc-600 text-white inline-block mt-6 hover:bg-zinc-900 active:bg-zinc-800 duration-200 ease-out"
                    state={{ lib }}
                  >
                    Go To Ad-Lib
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

export default BrowseLibs;
