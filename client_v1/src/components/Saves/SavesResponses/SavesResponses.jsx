import Card from "../../Card/Card";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const SavesResponses = ({ responses, removeResponse, removeAllResponses }) => {
  return (
    <Card useForSmall>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3
              className="text-2xl font-semibold cpaitalize"
              data-testid="header"
            >
              Saved Ad-Lib Responses
            </h3>
            <p className="text-zinc-600" data-testid="description">
              View your saved ad-lib responses
            </p>
          </div>
          <button
            className="py-3 px-3 hover:bg-zinc-900 w-fit text-red-400 disabled:text-red-300 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
            type="button"
            onClick={removeAllResponses}
            data-testid="clear-saves-btn"
            disabled={responses.length === 0}
          >
            Remove All
          </button>
        </div>
        {responses.length === 0 ? (
          <p className="font-semibold" data-testid="no-ad-libs">
            You don not have any saved Ad-Libs
          </p>
        ) : (
          <ul data-testid="saves-responses" className="flex flex-col gap-5">
            {responses.map((response) => {
              return (
                <li key={response._id}>
                  <div className="border border-zinc-600 text-white p-5 rounded-lg flex flex-col gap-5">
                    <div className="flex items-start">
                      <h6 className="text-xl font-semibold whitespace-wrap max-w-[75%]">
                        {response.adlib.prompt}
                      </h6>
                      <p className="text-zinc-400 ml-auto">
                        {dayjs(response.createdAt).format("MMM, D")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link
                        to={`/libs/play/${response.adlib._id}`}
                        className="w-36 text-center p-3 rounded border border-zinc-600 text-white hover:bg-zinc-900 active:bg-zinc-800 duration-200 ease-out"
                      >
                        Go To Ad-Lib
                      </Link>
                      <Link
                        to={`/libs/view/${response._id}`}
                        className="w-36 text-center p-3 rounded border border-zinc-600 text-white hover:bg-zinc-900 active:bg-zinc-800 duration-200 ease-out"
                      >
                        Go To Response
                      </Link>
                      <div className="ml-auto flex justify-end">
                        <button
                          className="ml-auto w-12 h-12 p-3 hover:bg-zinc-900 w-fit text-red-400 disabled:text-red-300 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
                          type="button"
                          onClick={removeResponse}
                          data-testid="clear-saves-btn"
                          disabled={responses.length === 0}
                          data-responseid={response._id}
                        >
                          <i
                            className="fa-solid fa-trash"
                            data-responseid={response._id}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default SavesResponses;
