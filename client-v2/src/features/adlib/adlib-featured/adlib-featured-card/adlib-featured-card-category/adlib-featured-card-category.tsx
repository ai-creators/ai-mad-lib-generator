import { buttonVariants } from "@/components/ui/button";
import { Category } from "@/features/adlib/models/category.model";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type AdlibFeaturedCardCategoryProps = {
  category: Category;
};

const colors = [
  "text-red-600 dark:text-red-400",
  "text-green-600 dark:text-green-400",
  "text-blue-600 dark:text-blue-400",
];
const AdlibFeaturedCardCategory = ({
  category,
}: AdlibFeaturedCardCategoryProps) => {
  const randomColorIndex = Math.floor(colors.length * Math.random());

  return (
    <Link
      className={cn(buttonVariants({ variant: "link" }), "px-2")}
      href={`/categories?q=${encodeURIComponent(category.name)}`}
    >
      <span className={`${colors[randomColorIndex]} -mr-1`}>#</span>
      {category.name}
    </Link>
  );
};

export default AdlibFeaturedCardCategory;
