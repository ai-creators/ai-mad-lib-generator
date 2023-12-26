import { AdlibModel } from "../../../../models/AdlibModel";
import Card from "../../../card/Card";
import ButtonLight from "../../../button/button-light/ButtonLight";

type Props = {
  adlib: AdlibModel;
};

const AdlibCategoriesCard = ({ adlib }: Props) => {
  return (
    <Card className="flex flex-col gap-1" padding="p-2">
      <h4 className="text-lg font-semibold px-3 pt-3">Categories</h4>
      <ul>
        {adlib?.categories
          ? adlib.categories.map((category) => {
              return (
                <li key={category.id}>
                  <ButtonLight
                    href={`/adlib/category/${category.name}`}
                    className="block"
                  >
                    #{category.name}
                  </ButtonLight>
                </li>
              );
            })
          : null}
      </ul>
    </Card>
  );
};

export default AdlibCategoriesCard;
