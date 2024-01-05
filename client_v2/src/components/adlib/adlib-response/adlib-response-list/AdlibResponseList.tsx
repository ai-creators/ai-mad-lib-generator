import { AdlibResponseModel } from "../../../../models/AdlibResponseModel";
import AdlibResponseCard from "../adlib-response-card/AdlibResponseCard";

type Props = {
  data: AdlibResponseModel[];
};

const AdlibResponseList = ({ data }: Props) => {
  console.log(data);
  return (
    <ul className="flex flex-col gap-5">
      {data.map((response) => (
        <li key={response.id}>
          <AdlibResponseCard response={response} />
        </li>
      ))}
    </ul>
  );
};

export default AdlibResponseList;
