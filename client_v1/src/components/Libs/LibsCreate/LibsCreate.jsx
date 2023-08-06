import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Card/Card";
import Lib from "../../../api/Lib";
import ApiErrorHandler from "../../../errors/ApiErrorHandler";
import ErrorAlert from "../../../errors/ErrorAlert";
import ToastInformation from "../../Toast/ToastInformation/ToastInformation";
import Loader from "../../Loader/Loader";

const LibsCreate = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const createLib = async (event) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        setError(null);
        event.preventDefault();
        if (!prompt) {
          throw new Error(" A prompt is required");
        }
        const response = await Lib.create(prompt);
        if (response.data) {
          navigate("/libs/play", { state: { lib: response.data } });
        }
      }
    } catch (e) {
      setError(ApiErrorHandler.handleRequestResponse(e));
    } finally {
      setIsLoading(false);
    }
  };

  const createRandomLib = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setPrompt("");
      const response = await Lib.createRandom();
      if (response.data) {
        navigate("/libs/play", { state: { lib: response.data } });
      }
    } catch (e) {
      setError(ApiErrorHandler.handleRequestResponse(e));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card useForSmall>
      {isLoading ? (
        <ToastInformation className="w-48">
          <div className="flex items-center justify-center gap-5">
            <p>Loading</p>
            <Loader />
          </div>
        </ToastInformation>
      ) : null}
      <ErrorAlert error={error} setError={setError} className="mb-3" />
      <h3 className="text-2xl font-semibold">Create an Ad-lib</h3>
      <form className="flex flex-col gap-3" onSubmit={createLib}>
        <label htmlFor="prompt" className="text-zinc-400">
          Enter a prompt to generate a ad lib
        </label>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              className="border-zinc-600 border p-3 pr-28 rounded bg-inherit w-full  focus:outline outline-2 outline-offset-2 outline-white placeholder:text-zinc-500"
              value={prompt}
              placeholder="A chicken fighting with my mother..."
              onChange={({ target: { value } }) => setPrompt(value)}
            />
            <button
              className="absolute py-3 right-0 top-1/2 -translate-y-1/2 w-24 hover:bg-zinc-900 active:bg-zinc-800 ease-out duration-200 border-zinc-600 border-r-rounded border disabled:cursor-not-allowed disabled:bg-zinc-800"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Generate"}
            </button>
          </div>
          <button
            className="py-3 px-3 hover:bg-zinc-900 w-fit active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
            type="button"
            onClick={createRandomLib}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Random Ad-Lib"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default LibsCreate;
