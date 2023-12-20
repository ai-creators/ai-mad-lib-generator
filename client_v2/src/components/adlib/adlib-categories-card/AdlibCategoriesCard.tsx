import { Link } from "react-router-dom";
import { AdlibModel } from "../../../models/AdlibModel";
import { AdlibResponseModel } from "../../../models/AdlibResponseModel";
import Card from "../../card/Card";
import ButtonLight from "../../button/button-light/ButtonLight";

type Props = {
  adlib: AdlibModel;
};

const AdlibCategoriesCard = ({ adlib }: Props) => {
  return (
    <Card className="flex flex-col gap-3">
      <h4 className="text-xl font-semibold">Categories</h4>
      <ul>
        {adlib.categories.map((category) => {
          return (
            <li key={category.id}>
              <ButtonLight
                href={`adlib/categories/${category.id}`}
                className="block"
              >
                #{category.name}
              </ButtonLight>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default AdlibCategoriesCard;
