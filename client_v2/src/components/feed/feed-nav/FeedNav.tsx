import React from "react";
import { FeedTypes } from "../FeedTypes";
import ButtonLight from "../../button/button-light/ButtonLight";

type Props = {
  feedType: FeedTypes;
  setFeedType: React.Dispatch<React.SetStateAction<FeedTypes>>;
  navItems: FeedTypes[];
};

const FeedNav = ({ feedType, setFeedType, navItems }: Props) => {
  const changeFeedType = (feedType: FeedTypes) => {
    setFeedType(feedType);
  };
  return (
    <ul className="flex gap-3">
      {navItems.map((navItem) => (
        <li key={navItem}>
          <ButtonLight
            className={feedType === navItem ? "font-bold w-24" : "w-24"}
            onClick={() => changeFeedType(navItem)}
          >
            {navItem}
          </ButtonLight>
        </li>
      ))}
    </ul>
  );
};

export default FeedNav;
