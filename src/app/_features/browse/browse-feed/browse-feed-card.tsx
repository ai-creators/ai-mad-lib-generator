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
import { formatDateToMinutes } from "~/app/_utils/format-date";
import Link from "next/link";
import { routerConfig } from "~/app/router-config";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type GetPaginatedOutput = inferProcedureOutput<
  AppRouter["adlib"]["getPaginated"]
>;
type Adlib = GetPaginatedOutput["results"][number];

type Props = {
  adlib: Adlib;
};

function BrowseFeedCard({ adlib }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-baseline justify-between pb-3">
        <div>
          <CardTitle className="mb-1 line-clamp-1">{adlib.title}</CardTitle>
          <CardDescription className="line-clamp-1">
            Prompt: {adlib.prompt}
          </CardDescription>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatDateToMinutes(adlib.createdAt)}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {adlib.categories?.length ? (
          <ul className="flex items-center gap-3 text-muted-foreground">
            {adlib.categories.map((cat) => (
              <li key={adlib.id + cat}>
                <Link href={routerConfig.categories.execute({ category: cat })}>
                  #{cat}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href={routerConfig.adlib.execute({ id: adlib.id })}
          className={cn(buttonVariants({ variant: "default" }), "w-fit")}
        >
          Go to adlib
        </Link>
      </CardContent>
    </Card>
  );
}

export default BrowseFeedCard;
