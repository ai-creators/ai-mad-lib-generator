import { useEffect } from "react";
import { ErrorModel } from "@/models/ErrorModel";
import { FeedTypes } from "@/models/FeedTypes";
import { PaginationResponse } from "@/models/PaginationResponse";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoryService } from "@/services/CategoryService";
import { CategoryModel } from "@/models/CategoryModel";

export const useCategoryBrowse = () => {
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";

  const changeFeedType = (newFeedType: FeedTypes) => {
    setFeedType(newFeedType);
  };

  const getCategories = (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<[PaginationResponse<CategoryModel> | null, ErrorModel | null]> => {
    return categoryService.getCategories(
      page,
      size,
      timestamp,
      feedType,
      search
    );
  };

  useEffect(() => {
    if (search) {
      setFeedType(FeedTypes.LATEST);
    }
  }, [search]);

  useEffect(() => {
    if (feedType == FeedTypes.FEATURED) {
      if (search) {
        searchParams.delete("q");
        setSearchParams(searchParams);
      }
    }
  }, [feedType]);

  return { feedType, changeFeedType, getCategories, search };
};
