import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { FeedType } from "../browse-feed-type";

interface BrowseFeedTabsProps {
  feedType: FeedType;
  changeFeedType: (feedType: FeedType) => void;
}

const feedTypes = Object.values(FeedType);

export default function BrowseFeedType({
  feedType,
  changeFeedType,
}: BrowseFeedTabsProps) {
  return (
    <Tabs
      value={feedType}
      onValueChange={(value: string) => changeFeedType(value as FeedType)}
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
