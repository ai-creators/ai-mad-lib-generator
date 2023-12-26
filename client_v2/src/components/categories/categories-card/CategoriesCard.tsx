import { Link } from "react-router-dom";
import { CategoryModel } from "../../../models/CategoryModel";
import Card from "../../card/Card";
import ButtonPrimary from "../../button/button-primary/ButtonPrimary";
import dayjs from "dayjs";

type Props = {
  category: CategoryModel;
};

const CategoriesCard = ({ category }: Props) => {
  return (
    <Card className="flex flex-col gap-3">
      <div>
        <div>
          <Link to={`/adlib/category/${category.name}`}>
            <h6 className="text-xl font-semibold text-black capitalize">
              {category.name}
            </h6>
          </Link>
          <p>{dayjs(category.createdAt).format("MMM, D")}</p>
        </div>

        {category.adlibs ? (
          <p className="text-zinc-500">{category.adlibs.length} Adlibs</p>
        ) : null}
      </div>
      <div className="flex">
        <ButtonPrimary>Go To Category</ButtonPrimary>
      </div>
    </Card>
  );
};

export default CategoriesCard;
