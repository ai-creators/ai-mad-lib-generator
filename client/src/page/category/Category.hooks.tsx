import { AdlibModel } from "@/models/AdlibModel";
import { CategoryModel } from "@/models/CategoryModel";
import { ErrorModel } from "@/models/ErrorModel";
import { PaginationResponse } from "@/models/PaginationResponse";
import { categoryService } from "@/services/CategoryService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useCategory = () => {
  const { categoryName } = useParams();
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (categoryName) {
        const [data, apiError] = await categoryService.findCategoryByName(
          categoryName
        );
        if (data && !ignore) {
          setCategory(data);
        }
        if (apiError && !ignore) {
          setError(apiError);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [categoryName]);

  const getAdlibs = (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<[PaginationResponse<AdlibModel> | null, ErrorModel | null]> => {
    return categoryService.getAdlibsByCategoryName(
      categoryName ?? "",
      page,
      size,
      timestamp
    );
  };

  return { categoryName, category, error, getAdlibs };
};
