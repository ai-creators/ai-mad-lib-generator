"use client";

import React from "react";
import BrowseFeedType from "./browse-feed-type";
import { CardDescription, CardTitle } from "~/components/ui/card";
import { type FeedTypeOption } from "~/types/adlib";
import { useSearchParams } from "next/navigation";

type BrowseFeedHeaderProps = {
  feedType: FeedTypeOption;
  changeFeedType: (newFeedType: FeedTypeOption) => void;
};

export default function BrowseFeedHeader({
  feedType,
  changeFeedType,
}: BrowseFeedHeaderProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  const titleText =
    searchTerm && searchTerm.trim().length > 0
      ? `${searchTerm}...`
      : `${feedType}...`;

  const descriptionText =
    searchTerm && searchTerm.trim().length > 0
      ? `View adlibs for ${searchTerm}`
      : `View the ${feedType.toLowerCase()} adlibs`;

  return (
    <header className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-4 sm:mb-0">
        <CardTitle className="capitalize">{titleText}</CardTitle>
        <CardDescription>{descriptionText}</CardDescription>
      </div>
      <div>
        <BrowseFeedType feedType={feedType} changeFeedType={changeFeedType} />
      </div>
    </header>
  );
}
