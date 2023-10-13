import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeLib, addLib } from "../../../../slices/savesSlice";

const LibViewerReactions = ({ lib }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { saves } = useSelector((state) => state.saves);
  const toggleLike = () => {
    setIsLiked((curr) => !curr);
  };
  const toggleReport = () => {
    setIsReported((curr) => !curr);
  };
  const toggleSave = () => {
    if (saves.some((save) => save._id === lib._id)) {
      dispatch(removeLib(lib));
    } else {
      dispatch(addLib(lib));
    }
  };
  const toggleHidden = () => {
    setIsHidden((curr) => !curr);
  };

  return (
    <ul className="flex gap-3 items-center">
      {/* <li>
        <button
          onClick={toggleHidden}
          className="py-3 px-3 hover:bg-zinc-900 w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          <i
            className={`${
              isHidden ? "fa-solid" : "fa-regular"
            } fa-eye-slash mr-2`}
          ></i>{" "}
          {isHidden ? "Hidden" : "Hide"}
        </button>
      </li>
      <li>
        <button
          onClick={toggleLike}
          className="py-3 px-3 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          <i
            className={`${
              isLiked ? "fa-solid" : "fa-regular"
            } fa-thumbs-up mr-2`}
          ></i>{" "}
          {isLiked ? "Liked" : "Like"}
        </button>
      </li>
      <li>
        <button
          onClick={toggleReport}
          className="py-3 px-3 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          <i
            className={`${isReported ? "fa-solid" : "fa-regular"} fa-flag mr-2`}
          ></i>{" "}
          {isReported ? "Reported" : "Report"}
        </button>
      </li> */}
      <li>
        <button
          onClick={toggleSave}
          className="py-3 px-3 w-44 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          <i
            className={`${
              saves.some((save) => save._id === lib._id)
                ? "fa-solid"
                : "fa-regular"
            } fa-heart mr-2`}
          ></i>{" "}
          {saves.some((save) => save._id === lib._id) ? "Saved" : "Save"} Prompt
        </button>
      </li>
      <li>
        <button
          onClick={toggleSave}
          className="py-3 px-3 w-44 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          <i
            className={`${
              saves.some((save) => save._id === lib._id)
                ? "fa-solid"
                : "fa-regular"
            } fa-heart mr-2`}
          ></i>{" "}
          {saves.some((save) => save._id === lib._id) ? "Saved" : "Save"}{" "}
          Response
        </button>
      </li>
    </ul>
  );
};

export default LibViewerReactions;
