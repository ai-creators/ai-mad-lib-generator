import React from "react";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { routerConfig } from "~/app/router-config";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type GetPaginatedOutput = inferProcedureOutput<
  AppRouter["adlib"]["getCategoriesPaginated"]
>;
type Category = GetPaginatedOutput["results"][number];

type Props = {
  category: Category;
};

function CategoriesFeedCard({ category }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-baseline justify-between pb-3">
        <div>
          <CardTitle className="mb-1 line-clamp-1">{category.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {category.adlibCount} adlibs created
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Link
          href={routerConfig.category.execute({
            category: category.name ?? "",
          })}
          className={cn(buttonVariants({ variant: "default" }), "w-fit")}
        >
          Go to category
        </Link>
      </CardContent>
    </Card>
  );
}

export default CategoriesFeedCard;
