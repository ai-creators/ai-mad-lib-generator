import { BookmarkModel } from "../../../../models/BookmarkModel";
import AdlibBookmarksCard from "../adlib-bookmarks-card/AdlibBookmarksCard";

type Props = {
  data: BookmarkModel[];
};

const AdlibBookmarksList = ({ data }: Props) => {
  return (
    <ul className="flex flex-col gap-2 lg:gap-5">
      {data.map((bookmark) => (
        <li key={bookmark.adlibId + bookmark.accountId}>
          <AdlibBookmarksCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  );
};

export default AdlibBookmarksList;
