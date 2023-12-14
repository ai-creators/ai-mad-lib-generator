import { AdlibModel } from "../../../models/AdlibModel";

type Props = {
  adlibs: AdlibModel[];
};

const FeedList = ({ adlibs }: Props) => {
  return (
    <ul className="flex flex-col gap-5">
      {adlibs.map((adlib) => (
        <li key={adlib.id}>
          <div className="">
            <p>{adlib.prompt}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FeedList;
