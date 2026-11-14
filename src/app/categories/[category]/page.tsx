import React from "react";
import { HydrateClient } from "~/trpc/server";
import CategoryBrowse from "~/app/_features/categories/category-browse";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return (
    <HydrateClient>
      <CategoryBrowse category={category} />
    </HydrateClient>
  );
}
