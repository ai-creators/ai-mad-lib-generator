import { BookmarkModel } from "../../../models/BookmarkModel";
import Feed from "../../feed/Feed";
import { FeedTypes } from "../../feed/FeedTypes";
import FeedNav from "../../feed/feed-nav/FeedNav";
import { useAdlibBookmarks } from "./AdlibBookmarks.hooks";
import AdlibBookmarksList from "./adlib-bookmarks-list/AdlibBookmarksList";

const AdlibBookmarks = () => {
  const { feedType, setFeedType, getBookmarks } = useAdlibBookmarks();
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{`Results for "${feedType}"`}</p>
        <FeedNav
          feedType={feedType}
          setFeedType={setFeedType}
          navItems={[FeedTypes.LATEST, FeedTypes.OLDEST]}
          className="ml-auto"
        />
      </div>
      <Feed<BookmarkModel>
        executable={getBookmarks}
        ListComponent={AdlibBookmarksList}
        endMessage={
          <p className="pt-5 px-4 font-semibold">No more Bookmarks available</p>
        }
        feedType={feedType}
      />
    </>
  );
};

export default AdlibBookmarks;
