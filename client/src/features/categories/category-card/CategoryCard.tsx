import { Card } from "@/components/ui/card";
import { CategoryModel } from "@/models/CategoryModel";
import { formatDate } from "@/utils/formatDate";

type Props = {
  category: CategoryModel;
};

const CategoryCard = ({ category }: Props) => {
  return (
    <Card className="p-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">#{category.name}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          {formatDate(category.createdAt)}
        </p>
      </div>
    </Card>
  );
};

export default CategoryCard;
