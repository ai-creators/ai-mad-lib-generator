import { Link } from "react-router-dom";
import { CategoryModel } from "../../../models/CategoryModel";
import Card from "../../card/Card";

type Props = {
  category: CategoryModel;
};

const CategoriesCard = ({ category }: Props) => {
  return (
    <Card>
      <h6>
        <Link to={`/adlib/category/${category.name}`}>{category.name}</Link>
      </h6>
    </Card>
  );
};

export default CategoriesCard;
