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
import { ErrorModel } from "../../../models/ErrorModel";
import { CategoryModel } from "../../../models/CategoryModel";
import CategoriesList from "../../../components/categories/categories-list/CategoriesList";
import FeedNav from "../../../components/feed/feed-nav/FeedNav";

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("q");

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);
  const [error, setError] = useState<ErrorModel | null>(null);

  const getCategories = async (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<PaginationResponse<CategoryModel>> => {
    const { data, error } = await CategoryService.getCategories(
      category ?? "",
      feedType,
      page,
      size,
      timestamp
    );
    if (error) {
      setError(error);
    }
    if (data) {
      return data;
    }
    return {
      results: [],
      page,
      size,
      totalPages: 0,
    };
  };

  return (
    <Layout>
      <Container className="grid-aside gap-5 my-5">
        <aside className="flex flex-col gap-5">
          <NavbarItems />
        </aside>
        <div className="flex flex-col gap-5">
          <AdlibCategoriesSearchCard />
          <FeedNav
            feedType={feedType}
            setFeedType={setFeedType}
            navItems={[FeedTypes.LATEST, FeedTypes.OLDEST]}
          />
          <Feed<CategoryModel>
            executable={getCategories}
            ListComponent={CategoriesList}
            endMessage={
              <p className="pt-5 px-4 font-semibold">
                No more Categories available
              </p>
            }
            feedType={feedType}
            error={error}
          />
        </div>
        <div></div>
      </Container>
    </Layout>
  );
};

export default CategoriesPage;
