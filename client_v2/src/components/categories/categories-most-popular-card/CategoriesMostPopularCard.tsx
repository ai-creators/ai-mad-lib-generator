import Card from "../../card/Card";
import { useCategoriesMostPopular } from "./CategoriesMostPopularCard.hooks";
import ButtonLight from "../../button/button-light/ButtonLight";

const CategoriesMostPopularCard = () => {
  const { categories, isLoading } = useCategoriesMostPopular();
  return (
    <Card padding="p-2">
      <div>
        <h4 className="px-3 py-1 font-semibold">Most Popular</h4>
      </div>
      <ul className="flex flex-col gap-1">
        {isLoading ? (
          <>
            <div className="h-8 w-full pulse duration-200"></div>
          </>
        ) : (
          categories.map((category) => (
            <li key={category.id}>
              <ButtonLight
                href={`/adlib/category/${category.name}`}
                className="block"
              >
                #{category?.name.toLowerCase()}
              </ButtonLight>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
};

export default CategoriesMostPopularCard;
