import { useState } from "react";
import Card from "../../Card/Card";

const BrowseSearch = ({ setSearch, setType }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading] = useState(false);
  const searchLib = (event) => {
    event.preventDefault();
    setSearch(inputValue);
    setInputValue("");
    setType("");
  };

  return (
    <Card useForSmall>
      <h3 className="text-2xl font-semibold">Search an Ad-Lib</h3>
      <form className="flex flex-col gap-3" onSubmit={searchLib}>
        <label htmlFor="search" className="text-zinc-400">
          Search an Ad-Lib
        </label>
        <div className="relative flex-grow">
          <input
            type="text"
            id="search"
            className="border-zinc-600 border p-3 pr-28 rounded bg-inherit w-full focus:outline outline-2 outline-offset-2 outline-white placeholder:text-zinc-500"
            value={inputValue}
            placeholder="Search an Ad-Lib"
            onChange={({ target: { value } }) => setInputValue(value)}
          />
          <button
            className="absolute py-3 right-0 top-1/2 -translate-y-1/2 w-24 hover:bg-zinc-900 active:bg-zinc-800 ease-out duration-200 border-zinc-600 border-r-rounded border disabled:cursor-not-allowed disabled:bg-zinc-800"
            type="submit"
            disabled={isLoading || !inputValue.length}
          >
            {isLoading ? "Loading" : "Search"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default BrowseSearch;
