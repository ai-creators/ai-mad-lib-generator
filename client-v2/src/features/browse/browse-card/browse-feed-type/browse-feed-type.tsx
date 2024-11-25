import React from "react";
import { FeedType } from "../../models/feed-type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BrowseFeedTypeProps = {
  feedType: FeedType;
  allowedFeedTypes: FeedType[];
  changeFeedType: (newFeedType: FeedType) => void;
  defaultValue: string;
};
const BrowseFeedType = ({
  feedType,
  changeFeedType,
  allowedFeedTypes,
  defaultValue,
}: BrowseFeedTypeProps) => {
  return (
    <Tabs defaultValue={defaultValue} value={feedType}>
      <TabsList className={`grid w-full grid-cols-${allowedFeedTypes.length}`}>
        {allowedFeedTypes.map((feedType) => (
          <TabsTrigger
            value={feedType}
            onClick={() => changeFeedType(feedType)}
            className="w-20"
          >
            {feedType}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default BrowseFeedType;
