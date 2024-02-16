import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedTypes } from "@/models/FeedTypes";

type Props = {
  changeFeedType: (newFeedType: FeedTypes) => void;
  feedType: FeedTypes;
};

const AdlibBrowseNav = ({ changeFeedType, feedType }: Props) => {
  return (
    <Tabs value={feedType}>
      <TabsList>
        <TabsTrigger
          value={FeedTypes.FEATURED}
          onClick={() => changeFeedType(FeedTypes.FEATURED)}
          className="w-20"
        >
          {FeedTypes.FEATURED}
        </TabsTrigger>
        <TabsTrigger
          value={FeedTypes.LATEST}
          onClick={() => changeFeedType(FeedTypes.LATEST)}
          className="w-20"
        >
          {FeedTypes.LATEST}
        </TabsTrigger>
        <TabsTrigger
          value={FeedTypes.OLDEST}
          onClick={() => changeFeedType(FeedTypes.OLDEST)}
          className="w-20"
        >
          {FeedTypes.OLDEST}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AdlibBrowseNav;
