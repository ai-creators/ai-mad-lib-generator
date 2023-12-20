import React from "react";
import { FeedTypes } from "../FeedTypes";
import ButtonLight from "../../button/button-light/ButtonLight";

type Props = {
  feedType: FeedTypes;
  setFeedType: React.Dispatch<React.SetStateAction<FeedTypes>>;
};

const FeedNav = ({ feedType, setFeedType }: Props) => {
  const changeFeedType = (feedType: FeedTypes) => {
    setFeedType(feedType);
  };
  return (
    <ul className="flex gap-3">
      <li>
        <ButtonLight
          className={
            feedType === FeedTypes.FEATURED ? "font-bold w-24" : "w-24"
          }
          onClick={() => changeFeedType(FeedTypes.FEATURED)}
        >
          Featured
        </ButtonLight>
      </li>
      <li>
        <ButtonLight
          className={feedType === FeedTypes.LATEST ? "font-bold w-24" : "w-24"}
          onClick={() => changeFeedType(FeedTypes.LATEST)}
        >
          Latest
        </ButtonLight>
      </li>
    </ul>
  );
};

export default FeedNav;
