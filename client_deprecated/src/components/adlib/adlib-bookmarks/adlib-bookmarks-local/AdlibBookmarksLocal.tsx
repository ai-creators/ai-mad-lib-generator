import { FeedTypes } from "../../../feed/FeedTypes";
import FeedNav from "../../../feed/feed-nav/FeedNav";
import { useAdlibBookmarksLocal } from "./AdlibBookmarksLocal.hooks";
import AdlibBookmarksLocalList from "./adlib-bookmarks-local-list/AdlibBookmarksLocalList";

const AdlibBookmarksLocal = () => {
  const { feedType, setFeedType, bookmarks } = useAdlibBookmarksLocal();
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

      {bookmarks.length ? (
        <AdlibBookmarksLocalList bookmarks={bookmarks} />
      ) : (
        <p className="pt-5 px-4 font-semibold">No more Bookmarks available</p>
      )}
    </>
  );
};

export default AdlibBookmarksLocal;
