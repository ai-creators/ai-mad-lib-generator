import React from "react";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import BrowseFeedCard from "./browse-feed-card";

type GetPaginatedOutput = inferProcedureOutput<
  AppRouter["adlib"]["getPaginated"]
>;
type Adlib = GetPaginatedOutput["results"][number];

type Props = {
  adlibs: Adlib[];
};

function BrowseFeedList({ adlibs }: Props) {
  return (
    <ul className="flex flex-col gap-5">
      {adlibs.map((adlib) => (
        <li key={adlib.id}>
          <BrowseFeedCard adlib={adlib} />
        </li>
      ))}
    </ul>
  );
}

export default BrowseFeedList;
