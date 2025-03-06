import React from "react";
import { HydrateClient } from "~/trpc/server";
import Categories from "../_features/categories/categories";

export default function CategoriesPage() {
  return (
    <HydrateClient>
      <Categories />
    </HydrateClient>
  );
}
