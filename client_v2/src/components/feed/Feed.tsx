import { useState } from "react";
import { FeedTypes } from "./FeedTypes";
import FeedNav from "./feed-nav/FeedNav";

const Feed = () => {
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.FEATURED);

  return (
    <>
      <FeedNav feedType={feedType} setFeedType={setFeedType} />
    </>
  );
};

export default Feed;
