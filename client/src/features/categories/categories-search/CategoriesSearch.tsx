import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCategoriesSearch } from "./CategoriesSearch.hooks";

const CategoriesSearch = () => {
  const { search, changeSearch, submitSearch } = useCategoriesSearch();
  return (
    <Card className="p-5">
      <h2 className="text-2xl font-semibold">Search a Category</h2>
      <form className="flex flex-col gap-3" onSubmit={submitSearch}>
        <label htmlFor="search" className="text-zinc-600 dark:text-zinc-400">
          Search user categories
        </label>
        <div className="relative">
          <Input
            type="search"
            id="search"
            placeholder="Search adlibs..."
            value={search}
            onChange={changeSearch}
          />
          <Button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-[0px] px-5"
          >
            Search
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CategoriesSearch;
