import { useEffect, useState } from "react";
import { FeedTypes } from "../../../feed/FeedTypes";
import { BookmarkModel } from "../../../../models/BookmarkModel";
import LocalReactionService from "../../../../services/LocalReactionService";

export const useAdlibBookmarksLocal = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkModel[]>([]);
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);

  useEffect(() => {
    const getBookmarks = () => {
      const bookmarks = LocalReactionService.getBookmarks(feedType);
      setBookmarks(bookmarks);
    };
    getBookmarks();
  }, [feedType]);

  return { feedType, setFeedType, bookmarks };
};
