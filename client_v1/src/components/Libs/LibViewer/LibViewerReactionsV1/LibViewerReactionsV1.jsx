import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeLib, addLib } from "../../../../slices/savesSlice";
import { addResponse, removeResponse } from "../../../../slices/responsesSlice";
import ErrorAlert from "../../../../errors/ErrorAlert";

const LibViewerReactionsV1 = ({ lib, response }) => {
  //   const [isHidden, setIsHidden] = useState(false);
  //   const [isReported, setIsReported] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { saves } = useSelector((state) => state.saves);
  const { responses } = useSelector((state) => state.responses);
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [isResponseCopied, setIsResponseCopied] = useState(false);
  const copiedTime = 3000;
  //   const toggleLike = () => {
  //     setIsLiked((curr) => !curr);
  //   };
  //   const toggleReport = () => {
  //     setIsReported((curr) => !curr);
  //   };
  const toggleSavePrompt = () => {
    if (saves.some((save) => save._id === lib._id)) {
      dispatch(removeLib(lib));
    } else {
      dispatch(addLib(lib));
    }
  };

  const toggleSaveResponse = () => {
    if (responses.some((res) => res._id === response._id)) {
      dispatch(removeResponse(response));
    } else {
      dispatch(addResponse(response));
    }
  };

  const copyPrompt = async () => {
    const promptCopyText = `Check out this adlib prompt: ${
      import.meta.env.VITE_CLIENT_BASE_URL
    }/libs/play/${lib._id}`;
    setIsPromptCopied(true);
    setTimeout(() => {
      setIsPromptCopied(false);
    }, copiedTime);
    try {
      await navigator.clipboard.writeText(promptCopyText);
    } catch (err) {
      setError({
        message: `Error copying to clipboard. Copy this text: ${promptCopyText}`,
      });
    }
  };

  const copyResponse = async () => {
    const responseCopyText = `Check out my adlib: ${
      import.meta.env.VITE_CLIENT_BASE_URL
    }/libs/view/${response._id}`;
    setIsResponseCopied(true);
    setTimeout(() => {
      setIsResponseCopied(false);
    }, copiedTime);
    try {
      await navigator.clipboard.writeText(responseCopyText);
    } catch (err) {
      setError({
        message: `Error copying to clipboard. Copy this text: ${responseCopyText}`,
      });
    }
  };
  //   const toggleHidden = () => {
  //     setIsHidden((curr) => !curr);
  //   };

  return (
    <>
      <ErrorAlert error={error} />
      <ul className="flex gap-3 flex-wrap items-center">
        <li>
          <button
            onClick={toggleSavePrompt}
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
            Prompt
          </button>
        </li>
        <li>
          <button
            onClick={toggleSaveResponse}
            className="py-3 px-3 w-44 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
          >
            <i
              className={`${
                responses.some((res) => res._id === response._id)
                  ? "fa-solid"
                  : "fa-regular"
              } fa-heart mr-2`}
            ></i>{" "}
            {responses.some((res) => res._id === response._id)
              ? "Saved"
              : "Save"}{" "}
            Response
          </button>
        </li>
        <li>
          <button
            onClick={copyPrompt}
            className="py-3 px-3 w-44 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
          >
            <i className="fa-solid fa-copy mr-2"></i>
            {isPromptCopied ? "Copied Link" : "Share Prompt"}
          </button>
        </li>
        <li>
          <button
            onClick={copyResponse}
            className="py-3 px-3 w-44 hover:bg-zinc-900  w-32 active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
          >
            <i className="fa-solid fa-copy mr-2"></i>
            {isResponseCopied ? "Shared Response" : "Share Response"}
          </button>
        </li>
      </ul>
    </>
  );
};

export default LibViewerReactionsV1;
