import { CategoryModel } from "../../../models/CategoryModel";
import CategoriesCard from "../categories-card/CategoriesCard";

type Props = {
  data: CategoryModel[];
};

const CategoriesList = ({ data }: Props) => {
  return (
    <ul className="flex flex-col gap-5">
      {data.map((category) => (
        <li key={category.id}>
          <CategoriesCard category={category} />
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
