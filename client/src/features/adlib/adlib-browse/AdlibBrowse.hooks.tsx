import { AdlibModel } from "@/models/AdlibModel";
import { ErrorModel } from "@/models/ErrorModel";
import { FeedTypes } from "@/models/FeedTypes";
import { PaginationResponse } from "@/models/PaginationResponse";
import AdlibService from "@/services/AdlibService";
import { useState } from "react";

export const useAdlibBrowse = () => {
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.FEATURED);

  const changeFeedType = (newFeedType: FeedTypes) => {
    setFeedType(newFeedType);
  };

  const getAdlibs = (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<[PaginationResponse<AdlibModel> | null, ErrorModel | null]> => {
    return AdlibService.getAdlibs(page, size, timestamp, feedType);
  };

  return { feedType, changeFeedType, getAdlibs };
};
