import dayjs from "dayjs";
import { Link } from "react-router-dom";

const BrowseList = ({ adlibs }) => {
  return (
    <ul className="flex flex-col gap-5 max-w-[100%]">
      {adlibs.map((lib) => {
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
  );
};

export default BrowseList;
