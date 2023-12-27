import React from "react";
import { FeedTypes } from "../FeedTypes";
import ButtonLight from "../../button/button-light/ButtonLight";
import { useSearchParams } from "react-router-dom";

type Props = {
  feedType: FeedTypes;
  setFeedType: React.Dispatch<React.SetStateAction<FeedTypes>>;
  navItems: FeedTypes[];
  className?: string;
  searchParams: URLSearchParams;
};

const FeedNav = ({
  feedType,
  setFeedType,
  navItems,
  className = "",
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const changeFeedType = (feedType: FeedTypes) => {
    setFeedType(feedType);
    if (searchParams.get("q")) {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };
  return (
    <ul className={`flex gap-3 ${className}`}>
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
