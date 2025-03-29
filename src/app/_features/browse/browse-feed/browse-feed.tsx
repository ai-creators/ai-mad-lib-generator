/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import BrowseFeedHeader from "./browse-feed-header";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { FeedTypeOption } from "~/types/adlib";
import InfiniteScroll from "react-infinite-scroll-component";
import BrowseFeedList from "./browse-feed-list";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useContentRating } from "../../content-rating/content-rating";

type GetPaginatedOutput = inferProcedureOutput<
  AppRouter["adlib"]["getPaginated"]
>;
type Adlib = GetPaginatedOutput["results"][number];

export default function BrowseFeed() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const [page, setPage] = useState(1);
  const size = 25;
  const [timestamp] = useState<Date>(new Date());
  const [feedType, setFeedType] = useState<FeedTypeOption>(
    FeedTypeOption.LATEST,
  );
  const [adlibs, setAdlibs] = useState<Adlib[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { contentRating } = useContentRating();

  const { data, isError, error } = api.adlib.getPaginated.useQuery({
    page,
    size,
    timestamp: timestamp.toISOString(),
    feedType,
    search: searchTerm,
    contentRating,
  });

  useEffect(() => {
    if (data) {
      setAdlibs((prev) =>
        page === 1 ? data.results : [...prev, ...data.results],
      );
      setTotalPages(data.totalPages);
    }
  }, [data, page]);

  const changeFeedType = (newFeedType: FeedTypeOption) => {
    setFeedType(newFeedType);
    setPage(1);
  };

  const fetchNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <BrowseFeedHeader feedType={feedType} changeFeedType={changeFeedType} />
      </CardHeader>
      <CardContent>
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <InfiniteScroll
          dataLength={adlibs.length}
          next={fetchNextPage}
          hasMore={page < totalPages}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="px-1 pt-5 text-muted-foreground">
              No more adlibs available.
            </p>
          }
        >
          <BrowseFeedList adlibs={adlibs} />
        </InfiniteScroll>
      </CardContent>
    </Card>
  );
}
