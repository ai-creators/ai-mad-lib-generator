"use client";

import React, { useState } from "react";
import { useAdlibsPaginated } from "../api/get-adlibs-paginated";
import { FeedType } from "../models/feed-type";
import { Card } from "@/components/ui/card";
import BrowseFeedType from "./browse-feed-type/browse-feed-type";
import Loader from "@/components/loader/loader";
import BrowseList from "./browse-list/browse-list";
import ScrollTopButton from "@/components/scroll-top-button/scroll-top-button";
import Feed from "@/components/feed/feed";

const BrowseCard = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());
  const [feedType, setFeedType] = useState<FeedType>(FeedType.LATEST);

  const changeFeedType = (newFeedType: FeedType) => {
    setFeedType(newFeedType);
  };

  const adlibsPaginatedQuery = useAdlibsPaginated({
    page,
    size,
    timestamp,
    feedType /*  */,
  });

  return (
    <Card className="pb-5 rounded-none md:rounded-lg">
      <header className="p-5 flex flex-col sm:flex-row justify-between items-start gap-3">
        <div>
          <h3 className="text-2xl font-semibold">{feedType}...</h3>
          <p className="text-muted-foreground">View the {feedType} adlibs</p>
        </div>
        <BrowseFeedType
          defaultValue={FeedType.LATEST}
          feedType={feedType}
          changeFeedType={changeFeedType}
          allowedFeedTypes={[
            FeedType.FEATURED,
            FeedType.LATEST,
            FeedType.OLDEST,
          ]}
        />
      </header>
      {adlibsPaginatedQuery.isPending ? (
        <Loader className="p-5" />
      ) : (
        <Feed
          endMessage={
            <p className="px-5 font-semibold">No more adlibs available</p>
          }
          page={page}
          setPage={setPage}
          dataLength={adlibsPaginatedQuery.data?.results?.length ?? 0}
          hasNextPage={
            (adlibsPaginatedQuery?.data?.page ?? 0) <
            (adlibsPaginatedQuery?.data?.totalPages ?? 0)
          }
        >
          <BrowseList adlibs={adlibsPaginatedQuery.data?.results ?? []} />
        </Feed>
      )}
      <ScrollTopButton
        className="hidden lg:flex justify-center items-center"
        hasAnimation={true}
      />
    </Card>
  );
};

export default BrowseCard;
