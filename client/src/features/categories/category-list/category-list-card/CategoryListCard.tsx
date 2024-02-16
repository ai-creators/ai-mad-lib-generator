import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategoryAggregateModel } from "@/models/CategoryAggregateModel";
import { CategoryModel } from "@/models/CategoryModel";
import { Link } from "react-router-dom";

type Props = {
  category: CategoryModel | CategoryAggregateModel;
};

const CategoryListCard = ({ category }: Props) => {
  return (
    <Card className="p-5 flex flex-col gap-5 overflow-hidden">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold  line-clamp-1">#{category.name}</h6>
          {category?.adlibCount ? (
            <p className="text-zinc-600 dark:text-zinc-400">
              {category.adlibCount} adlibs created
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <Link
          to={`/category/${category.name}`}
          className={buttonVariants({ variant: "default" })}
        >
          Go to category
        </Link>
      </div>
    </Card>
  );
};

export default CategoryListCard;
