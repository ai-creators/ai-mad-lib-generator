import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useAdlibSearch = () => {
  const [search, setSearch] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();

    if (search) {
      setSearchParams({ q: search });
      setSearch("");
    }
  };

  useEffect(() => {
    const searchQuery: string = searchParams.get("q") ?? "";
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, []);

  return { search, changeSearch, submitSearch };
};
