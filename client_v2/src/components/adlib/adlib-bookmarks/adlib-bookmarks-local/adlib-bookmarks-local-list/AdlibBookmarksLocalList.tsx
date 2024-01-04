import { BookmarkModel } from "../../../../../models/BookmarkModel";
import AdlibBookmarksLocalCard from "../adlib-bookmarks-local-card/AdlibBookmarksLocalCard";

type Props = {
  bookmarks: BookmarkModel[];
};

const AdlibBookmarksLocalList = ({ bookmarks }: Props) => {
  return (
    <ul className="flex flex-col gap-2 lg:gap-5">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.adlib.id}>
          <AdlibBookmarksLocalCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  );
};

export default AdlibBookmarksLocalList;
