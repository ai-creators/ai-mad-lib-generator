import { AdlibModel } from "../../../models/AdlibModel";
import Card from "../../card/Card";

type Props = {
  adlib: AdlibModel;
};

const AdlibComment = ({ adlib }: Props) => {
  return (
    <Card>
      <p>0 Comments</p>
    </Card>
  );
};

export default AdlibComment;
