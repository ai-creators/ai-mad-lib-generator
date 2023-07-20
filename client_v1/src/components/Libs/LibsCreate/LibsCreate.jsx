import { useState } from "react";
import Card from "../../Card/Card";

const LibsCreate = () => {
  const [prompt, setPrompt] = useState("");
  const createLib = (event) => {
    event.preventDefault();
  };

  const createRandomLib = () => {};
  return (
    <Card>
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
              placeholder="A chciken fighting with my mother..."
              onChange={({ target: { value } }) => setPrompt(value)}
            />
            <button
              className="absolute py-3 right-0 top-1/2 -translate-y-1/2 w-24 hover:bg-zinc-900 active:bg-zinc-800 ease-out duration-200 border-zinc-600 border-r-rounded border"
              type="submit"
            >
              Generate
            </button>
          </div>
          <button
            className="py-3 px-3 hover:bg-zinc-900 w-fit active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600"
            onClick={createRandomLib}
          >
            Random Ad-Lib
          </button>
        </div>
      </form>
    </Card>
  );
};

export default LibsCreate;
