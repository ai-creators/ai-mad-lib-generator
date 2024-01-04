import { FeedTypes } from "../components/feed/FeedTypes";
import { BookmarkModel } from "../models/BookmarkModel";
import storage from "../utils/Storage";

const getBookmarks = (feedType: FeedTypes): BookmarkModel[] => {
  const allBookmarks: BookmarkModel[] = storage.get("bookmarks");

  if (Array.isArray(allBookmarks) && allBookmarks.length) {
    return allBookmarks.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (feedType === FeedTypes.OLDEST) {
        return dateA.getTime() - dateB.getTime();
      }
      return dateB.getTime() - dateA.getTime();
    });
  }
  return [];
};

const LocalReactionService = {
  getBookmarks,
};

Object.freeze(LocalReactionService);
export default LocalReactionService;
