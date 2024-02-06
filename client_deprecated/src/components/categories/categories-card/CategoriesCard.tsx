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
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <Link to={`/adlib/category/${category.name}`}>
              <h6 className="text-xl font-semibold text-black capitalize">
                #{category.name}
              </h6>
            </Link>
            {category?.adlibCount ? (
              <p className="text-zinc-500 text-sm">
                {category.adlibCount} Adlib{category.adlibCount > 1 ? "s" : ""}{" "}
                Created
              </p>
            ) : null}
          </div>

          <p className="text-zinc-500 text-sm ml-auto">
            {dayjs(category.createdAt).format("MMM, D")}
          </p>
        </div>
      </div>
      <div className="flex">
        <ButtonPrimary href={`/adlib/category/${category.name}`}>
          Go To Category
        </ButtonPrimary>
      </div>
    </Card>
  );
};

export default CategoriesCard;
