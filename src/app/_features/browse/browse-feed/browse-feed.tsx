"use client";

import React, { useState } from "react";
import BrowseFeedHeader from "./browse-feed-header";
import { api } from "~/trpc/react";
import { FeedTypeOption } from "~/types/adlib";
import InfiniteScroll from "react-infinite-scroll-component";
import BrowseFeedList from "./browse-feed-list";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useContentRating } from "../../content-rating/content-rating";
import BrowseFeedSkeleton from "./browse-feed-skeleton";

export default function BrowseFeed() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const size = 25;
  const [timestamp] = useState<Date>(new Date());
  const [feedType, setFeedType] = useState<FeedTypeOption>(
    FeedTypeOption.LATEST,
  );
  const { contentRating } = useContentRating();

  const { data, isError, error, isPending, hasNextPage, fetchNextPage } =
    api.adlib.getPaginated.useInfiniteQuery(
      {
        size,
        timestamp: timestamp.toISOString(),
        feedType,
        search: searchTerm,
        contentRating,
      },
      {
        initialCursor: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      },
    );

  const adlibs = data?.pages.flatMap((p) => p.results) ?? [];

  const changeFeedType = (newFeedType: FeedTypeOption) => {
    setFeedType(newFeedType);
  };

  return (
    <div className="flex flex-col gap-5">
      <BrowseFeedHeader feedType={feedType} changeFeedType={changeFeedType} />
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      {isPending ? (
        <BrowseFeedSkeleton />
      ) : (
        <InfiniteScroll
          dataLength={adlibs.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          }
          endMessage={
            <p className="px-1 pt-5 text-muted-foreground">
              No more adlibs available.
            </p>
          }
        >
          <BrowseFeedList adlibs={adlibs} />
        </InfiniteScroll>
      )}
    </div>
  );
}
