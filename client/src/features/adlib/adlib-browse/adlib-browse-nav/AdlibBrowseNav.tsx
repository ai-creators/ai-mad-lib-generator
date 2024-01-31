import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedTypes } from "@/models/FeedTypes";

type Props = {
  changeFeedType: (newFeedType: FeedTypes) => void;
};

const AdlibBrowseNav = ({ changeFeedType }: Props) => {
  return (
    <Tabs defaultValue={FeedTypes.FEATURED}>
      <TabsList>
        <TabsTrigger
          value={FeedTypes.FEATURED}
          onClick={() => changeFeedType(FeedTypes.FEATURED)}
        >
          {FeedTypes.FEATURED}
        </TabsTrigger>
        <TabsTrigger
          value={FeedTypes.LATEST}
          onClick={() => changeFeedType(FeedTypes.LATEST)}
        >
          {FeedTypes.LATEST}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AdlibBrowseNav;
