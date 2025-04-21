import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { FeedTypeOption } from "~/types/adlib";

interface BrowseFeedTabsProps {
  feedType: FeedTypeOption;
  changeFeedType: (feedType: FeedTypeOption) => void;
}

const feedTypes = [FeedTypeOption.LATEST, FeedTypeOption.OLDEST];

export default function BrowseFeedType({
  feedType,
  changeFeedType,
}: BrowseFeedTabsProps) {
  return (
    <Tabs
      value={feedType}
      onValueChange={(value: string) => changeFeedType(value as FeedTypeOption)}
      className="w-full"
    >
      <TabsList>
        {feedTypes.map((feed) => (
          <TabsTrigger key={feed} value={feed}>
            {feed.charAt(0).toUpperCase() + feed.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
