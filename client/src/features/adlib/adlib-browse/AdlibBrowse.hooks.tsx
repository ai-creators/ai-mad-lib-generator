import { FeedTypes } from "@/models/FeedTypes";
import { useState } from "react";

export const useAdlibBrowse = () => {
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.FEATURED);

  const changeFeedType = (newFeedType: FeedTypes) => {
    setFeedType(newFeedType);
  };

  return { feedType, changeFeedType };
};
