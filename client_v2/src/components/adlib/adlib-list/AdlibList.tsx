import { AdlibModel } from "../../../models/AdlibModel";
import AdlibCard from "../adlib-card/AdlibCard";

type Props = {
  data: AdlibModel[];
};

const AdlibList = ({ data }: Props) => {
  return (
    <ul className="flex flex-col gap-2 lg:gap-5">
      {data.map((adlib) => (
        <li key={adlib.id}>
          <AdlibCard adlib={adlib} />
        </li>
      ))}
    </ul>
  );
};

export default AdlibList;
