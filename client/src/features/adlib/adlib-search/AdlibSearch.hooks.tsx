import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useAdlibSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") ?? "");

  const changeSearch = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    setSearchParams({ q: search });
    setSearch("");
  };

  return { search, changeSearch, submitSearch };
};
