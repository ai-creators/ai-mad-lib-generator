import { useEffect, useState } from "react";
import { CategoryModel } from "../../../models/CategoryModel";
import CategoryService from "../../../services/CategoryService";

export const useCategoriesMostPopular = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [size] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await CategoryService.getMostPopularCategories(size);

      if (data) {
        setCategories(data);
      }

      setIsLoading(false);
    })();
  }, [size]);

  return { categories, isLoading };
};
