import Card from "../../card/Card";
import { useAdlibSearch } from "./AdlibSearch.hooks";

const AdlibSearch = () => {
  const { search, changeSearch, submitSearch } = useAdlibSearch();
  return (
    <Card className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold">Search for an Adlib</h2>
      </div>
      <form onSubmit={submitSearch}>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            value={search}
            id="search"
            onChange={changeSearch}
            className="border border-zinc-300 p-3 rounded w-full focus:outline outline-2 outline-offset-2"
            placeholder="Search"
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 border rounded-r border-zinc-300 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-black bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white"
            onClick={submitSearch}
            disabled={!search.length}
          >
            Search
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AdlibSearch;
