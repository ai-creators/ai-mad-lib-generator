import { AdlibModel } from "../../../models/AdlibModel";
import Card from "../../card/Card";
import ButtonLight from "../../button/button-light/ButtonLight";

type Props = {
  adlib: AdlibModel;
};

const AdlibCategoriesCard = ({ adlib }: Props) => {
  return (
    <Card className="flex flex-col gap-1" padding="p-1">
      <h4 className="text-lg font-semibold p-3">Categories</h4>
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
