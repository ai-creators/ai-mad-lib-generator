import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategoryModel } from "@/models/CategoryModel";
import { Link } from "react-router-dom";

type Props = {
  category: CategoryModel;
};

const CategoryListCard = ({ category }: Props) => {
  return (
    <Card className="p-5 flex flex-col gap-5 overflow-hidden">
      <div>
        <h6 className="font-semibold  line-clamp-1">{category.name}</h6>
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
