import { CategoryModel } from "@/models/CategoryModel";
import CategoryListCard from "./category-list-card/CategoryListCard";

type Props = {
  data: CategoryModel[];
};

const CategoryList = ({ data }: Props) => {
  return (
    <ul className="flex flex-col gap-5">
      {data.map((category) => (
        <li key={category.name}>
          <CategoryListCard category={category} />
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
