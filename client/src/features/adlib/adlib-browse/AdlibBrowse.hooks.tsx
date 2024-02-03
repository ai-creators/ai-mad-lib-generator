import { useEffect } from "react";
import { AdlibModel } from "@/models/AdlibModel";
import { ErrorModel } from "@/models/ErrorModel";
import { FeedTypes } from "@/models/FeedTypes";
import { PaginationResponse } from "@/models/PaginationResponse";
import AdlibService from "@/services/AdlibService";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useAdlibBrowse = () => {
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.FEATURED);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";

  const changeFeedType = (newFeedType: FeedTypes) => {
    setFeedType(newFeedType);
  };

  const getAdlibs = (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<[PaginationResponse<AdlibModel> | null, ErrorModel | null]> => {
    return AdlibService.getAdlibs(page, size, timestamp, feedType, search);
  };

  useEffect(() => {
    if (search) {
      setFeedType(FeedTypes.LATEST);
    }
  }, [search]);

  useEffect(() => {
    if (feedType == FeedTypes.FEATURED) {
      if (search) {
        searchParams.delete("q");
        setSearchParams(searchParams);
      }
    }
  }, [feedType]);

  console.log("FEED TYPE: ", feedType);

  return { feedType, changeFeedType, getAdlibs, search };
};
