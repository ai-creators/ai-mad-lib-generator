"use client";

import React, { useState } from "react";
import BrowseFeedType from "./browse-feed-type";
import { FeedType } from "../browse-feed-type";
import { CardDescription, CardTitle } from "~/components/ui/card";

export default function BrowseFeedHeader() {
  const [feedType, setFeedType] = useState<FeedType>(FeedType.FEATURED);

  const changeFeedType = (newFeedType: FeedType) => {
    if (feedType !== newFeedType) {
      setFeedType(newFeedType);
    }
  };

  return (
    <header className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-4 sm:mb-0">
        <CardTitle>Featured...</CardTitle>
        <CardDescription>View the featured adlibs</CardDescription>
      </div>
      <div>
        <BrowseFeedType feedType={feedType} changeFeedType={changeFeedType} />
      </div>
    </header>
  );
}
