import { Input } from "@/components/ui/input";
import { useSearchBar } from "./SearchBar.hooks";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  width?: string;
};
const SearchBar = ({ width = "w-48" }: Props) => {
  const { search, changeSearch, submitSearch } = useSearchBar();
  return (
    <form className={`${width} relative`} onSubmit={submitSearch}>
      <Input
        value={search}
        onChange={changeSearch}
        className="w-full"
        placeholder="Search Adlib..."
      />
      <Button
        className="absolute right-0 top-1/2 -translate-y-1/2 px-2.5 rounded-r"
        variant="ghost"
        type="submit"
      >
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
