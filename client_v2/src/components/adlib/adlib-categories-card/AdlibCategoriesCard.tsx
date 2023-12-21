import { AdlibModel } from "../../../models/AdlibModel";
import Card from "../../card/Card";
import ButtonLight from "../../button/button-light/ButtonLight";

type Props = {
  adlib: AdlibModel;
};

const AdlibCategoriesCard = ({ adlib }: Props) => {
  return (
    <Card className="flex flex-col gap-1" padding="p-2">
      <h4 className="text-lg font-semibold px-3 pt-3">Categories</h4>
      <ul>
        {adlib.categories.map((category) => {
          return (
            <li key={category.id}>
              <ButtonLight
                href={`/adlib/categories/${category.name}`}
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
