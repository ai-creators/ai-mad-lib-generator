import { AdlibModel } from "../../../models/AdlibModel";
import FeedListCard from "./feed-list-card/FeedListCard";

type Props = {
  adlibs: AdlibModel[];
};

const FeedList = ({ adlibs }: Props) => {
  return (
    <ul className="flex flex-col gap-5">
      {adlibs.map((adlib) => (
        <li key={adlib.id}>
          <FeedListCard adlib={adlib} />
        </li>
      ))}
    </ul>
  );
};

export default FeedList;
