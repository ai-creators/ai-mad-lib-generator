import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedTypes } from "@/models/FeedTypes";

type Props = {
  changeFeedType: (newFeedType: FeedTypes) => void;
  feedType: FeedTypes;
  feeds?: FeedTypes[];
};

const CategoryBrowseNav = ({
  changeFeedType,
  feedType,
  feeds = Object.values(FeedTypes),
}: Props) => {
  return (
    <Tabs value={feedType}>
      <TabsList>
        {feeds.map((feed) => (
          <TabsTrigger
            value={feed}
            onClick={() => changeFeedType(feed)}
            className="w-20"
          >
            {feed}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CategoryBrowseNav;
