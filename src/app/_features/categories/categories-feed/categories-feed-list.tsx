import React from "react";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import CategoriesFeedCard from "./categories-feed-card";

type GetPaginatedOutput = inferProcedureOutput<
  AppRouter["adlib"]["getCategoriesPaginated"]
>;
type Category = GetPaginatedOutput["results"][number];

type Props = {
  categories: Category[];
};

function CategoriesFeedList({ categories }: Props) {
  return (
    <ul className="flex flex-col gap-5">
      {categories.map((category) => (
        <li key={category.id}>
          <CategoriesFeedCard category={category} />
        </li>
      ))}
    </ul>
  );
}

export default CategoriesFeedList;
