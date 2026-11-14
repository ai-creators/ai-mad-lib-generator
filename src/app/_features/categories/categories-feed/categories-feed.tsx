"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { FeedTypeOption } from "~/types/adlib";
import InfiniteScroll from "react-infinite-scroll-component";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CategoriesFeedList from "./categories-feed-list";
import CategoriesFeedHeader from "./categories-feed-header";
import CategoriesFeedSkeleton from "./categories-feed-skeleton";

export default function CategoriesFeed() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const size = 25;
  const [timestamp] = useState<Date>(new Date());
  const [feedType, setFeedType] = useState<FeedTypeOption>(
    FeedTypeOption.LATEST,
  );

  const { data, isError, error, isLoading, hasNextPage, fetchNextPage } =
    api.adlib.getCategoriesPaginated.useInfiniteQuery(
      {
        size,
        timestamp: timestamp.toISOString(),
        feedType,
        search: searchTerm,
      },
      {
        initialCursor: 1,
        getNextPageParam: (lastPage) =>
          lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      },
    );

  const categories = data?.pages.flatMap((p) => p.results) ?? [];

  const changeFeedType = (newFeedType: FeedTypeOption) => {
    setFeedType(newFeedType);
  };

  return (
    <div className="flex flex-col gap-5">
      <CategoriesFeedHeader
        feedType={feedType}
        changeFeedType={changeFeedType}
      />
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      {isLoading ? (
        <CategoriesFeedSkeleton />
      ) : (
        <InfiniteScroll
          dataLength={categories.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          }
          endMessage={
            <p className="px-1 pt-5 text-muted-foreground">
              No more categories available.
            </p>
          }
        >
          <CategoriesFeedList categories={categories} />
        </InfiniteScroll>
      )}
    </div>
  );
}
