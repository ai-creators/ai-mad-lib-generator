import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../../card/Card";

const AdlibCategoriesSearchCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string>("");

  const searchQuery = searchParams.get("q") ?? "";

  const changeCategory = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setCategory(value);
  };

  const submitCategory = (event: FormEvent) => {
    event.preventDefault();
    if (searchQuery !== category) {
      setSearchParams({ q: category });
      setCategory("");
    }
  };

  return (
    <Card className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold">Search Category</h2>
        <p className="text-zinc-500">Search adlibs by</p>
      </div>
      <form>
        <div className="flex relative">
          <label className="sr-only">Enter a category to search</label>
          <input
            className="border border-zinc-300 p-3 rounded w-full focus:outline outline-2 outline-offset-2"
            placeholder="Search category"
            value={category}
            onChange={changeCategory}
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 border rounded-r border-zinc-300 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-black bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white"
            onClick={submitCategory}
            disabled={!category.length}
          >
            Search
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AdlibCategoriesSearchCard;
