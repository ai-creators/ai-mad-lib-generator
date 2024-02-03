import Container from "../../../components/container/Container";
import Layout from "../../../layout/Layout";
import NavbarItems from "../../../components/navbar/navbar-items/NavbarItems";
import AdlibCategoriesSearchCard from "../../../components/adlib/adlib-categories/adlib-categories-search-card/AdlibCategoriesSearchCard";

import Feed from "../../../components/feed/Feed";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FeedTypes } from "../../../components/feed/FeedTypes";
import CategoryService from "../../../services/CategoryService";
import { PaginationResponse } from "../../../models/PaginationResponse";
import { CategoryModel } from "../../../models/CategoryModel";
import CategoriesList from "../../../components/categories/categories-list/CategoriesList";
import FeedNav from "../../../components/feed/feed-nav/FeedNav";
import { ApiResponse } from "../../../models/ApiResponseModel";
import CategoriesMostPopularCard from "../../../components/categories/categories-most-popular-card/CategoriesMostPopularCard";

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("q");

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);

  const getCategories = (
    page: number,
    size: number,
    timestamp: Date,
    abortController?: AbortController
  ): Promise<ApiResponse<PaginationResponse<CategoryModel>>> => {
    if (feedType === FeedTypes.POPULAR) {
      return CategoryService.getMostPopularCategories(page, size, timestamp);
    }
    return CategoryService.getCategories(
      category ?? "",
      feedType,
      page,
      size,
      timestamp,
      abortController
    );
  };

  return (
    <Layout>
      <Container className="grid-aside gap-5 my-5">
        <aside className="flex flex-col gap-5">
          <NavbarItems />
        </aside>
        <div className="flex flex-col gap-5">
          <AdlibCategoriesSearchCard />
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              {category
                ? `Search results for "${category}"`
                : `"${feedType}" categories`}
            </p>
            <FeedNav
              feedType={feedType}
              setFeedType={setFeedType}
              navItems={[FeedTypes.POPULAR, FeedTypes.LATEST, FeedTypes.OLDEST]}
              className="ml-auto"
            />
          </div>
          <Feed<CategoryModel>
            executable={getCategories}
            ListComponent={CategoriesList}
            endMessage={
              <p className="pt-5 px-4 font-semibold">
                No more Categories available
              </p>
            }
            feedType={feedType}
            search={searchParams.get("q") ?? ""}
          />
        </div>
        <div>
          <CategoriesMostPopularCard />
        </div>
      </Container>
    </Layout>
  );
};

export default CategoriesPage;
