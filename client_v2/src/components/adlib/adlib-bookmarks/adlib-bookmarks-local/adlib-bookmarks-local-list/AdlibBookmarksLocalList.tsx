import { BookmarkModel } from "../../../../../models/BookmarkModel";
import AdlibBookmarksCard from "../../adlib-bookmarks-card/AdlibBookmarksCard";

type Props = {
  bookmarks: BookmarkModel[];
};

const AdlibBookmarksLocalList = ({ bookmarks }: Props) => {
  return (
    <ul className="flex flex-col gap-2 lg:gap-5">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.adlib.id}>
          <AdlibBookmarksCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  );
};

export default AdlibBookmarksLocalList;
