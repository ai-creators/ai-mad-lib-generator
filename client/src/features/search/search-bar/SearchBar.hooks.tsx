import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const changeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (search) {
      navigate(`/browse?q=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return { search, changeSearch, submitSearch };
};
