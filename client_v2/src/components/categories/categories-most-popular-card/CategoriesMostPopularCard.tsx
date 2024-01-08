import { Link } from "react-router-dom";
import Card from "../../card/Card";
import { useCategoriesMostPopular } from "./CategoriesMostPopularCard.hooks";

const CategoriesMostPopularCard = () => {
  const { categories, isLoading } = useCategoriesMostPopular();
  return (
    <Card>
      <div>
        <h4>Most Popular</h4>
      </div>
      <ul className="flex flex-col gap-1">
        {isLoading ? (
          <>
            <div className="h-8 w-full pulse duration-200"></div>
          </>
        ) : (
          categories.map((category) => (
            <li key={category.id}>
              <Link to={`/adlib/category/${category.name}`}>
                #{category.name.toLowerCase()}
              </Link>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
};

export default CategoriesMostPopularCard;
