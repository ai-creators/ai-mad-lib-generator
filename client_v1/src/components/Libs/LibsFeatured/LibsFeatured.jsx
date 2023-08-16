import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../Card/Card";
import Lib from "../../../api/Lib";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";
import ErrorAlert from "../../../errors/ErrorAlert";
import Loader from "../../Loader/Loader";
import dayjs from "dayjs";

const LibsFeatured = () => {
  const [libs, setLibs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timestamp] = useState(new Date());

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const formattedDate = dayjs(timestamp).format("YYYY-MM-DD");
        const response = await Lib.get(formattedDate, "featured");
        if (response.data.results) {
          setLibs(response.data.results);
        }
      } catch (e) {
        setError(ApiErrorHandler.handleRequestResponse(e));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Card className="flex flex-col gap-3" useForSmall>
      <ErrorAlert error={error} />
      <div>
        <h3 className="text-2xl font-semibold">Featured Ad-libs</h3>
        <p className="text-zinc-400">
          View our featured Ad-Libs generated by our users.
        </p>
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

export default LibsFeatured;
