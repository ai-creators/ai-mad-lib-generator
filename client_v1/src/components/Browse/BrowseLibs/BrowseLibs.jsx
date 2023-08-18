import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../Card/Card";
import dayjs from "dayjs";
import Lib from "../../../api/Lib";
import Loader from "../../Loader/Loader";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";
import BrowseFeed from "../BrowseFeed/BrowseFeed";

const BrowseLibs = ({ search, setSearch }) => {
  const [type, setType] = useState("featured");
  const [error, setError] = useState(null);
  const changeType = ({ target: { id } }) => {
    if (search) {
      setSearch("");
    }
    setType(id);
  };

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
      <BrowseFeed
        search={search}
        type={type}
        error={error}
        setError={setError}
      />
    </Card>
  );
};

export default BrowseLibs;
