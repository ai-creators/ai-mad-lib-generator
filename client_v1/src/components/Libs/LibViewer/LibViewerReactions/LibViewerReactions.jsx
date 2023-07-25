import { useState } from "react";

const LibViewerReactions = ({ lib }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const toggleLike = () => {
    setIsLiked((curr) => !curr);
  };
  const toggleReport = () => {
    setIsReported((curr) => !curr);
  };
  const toggleSave = () => {
    setIsSaved((curr) => !curr);
  };
  const toggleHidden = () => {
    setIsHidden((curr) => !curr);
  };
  return (
    <ul className="flex gap-3 items-center">
      <li>
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
      </li>
      <li>
        <button
          onClick={toggleSave}
          className="py-3 px-3 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          <i
            className={`${isSaved ? "fa-solid" : "fa-regular"} fa-heart mr-2`}
          ></i>{" "}
          {isSaved ? "Saved" : "Save"}
        </button>
      </li>
    </ul>
  );
};

export default LibViewerReactions;
