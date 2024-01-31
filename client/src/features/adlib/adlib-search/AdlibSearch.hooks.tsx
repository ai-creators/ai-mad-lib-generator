import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useAdlibSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const changeSearch = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (searchParams.get("q") !== search) {
      setSearchParams({ q: search });
      setSearch("");
    }
  };

  return { search, changeSearch, submitSearch };
};
