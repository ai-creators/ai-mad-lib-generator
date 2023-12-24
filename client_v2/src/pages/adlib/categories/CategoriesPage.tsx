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

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("q");

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);
  const [error, setError] = useState<ErrorModel | null>(null);

  const getCategories = async (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<PaginationResponse<CategoryModel> | null> => {
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
    return data;
  };

  return (
    <Layout>
      <Container className="grid-aside gap-5 my-5">
        <aside className="flex flex-col gap-5">
          <NavbarItems />
        </aside>
        <div className="flex flex-col gap-5">
          <AdlibCategoriesSearchCard />
          <Feed<CategoryModel>
            executable={getCategories}
            listComponent={
              <ul>
                <li>TEST</li>
              </ul>
            }
          />
          {/* <Feed
            executable={getCategories}
            setPage={setPage}
            feedType={categoryName ?? ""}
            header={
              <header className="flex justify-between">
                <h2 className="text-xl font-semibold">
                  {categoryName
                    ? `Results for #${categoryName}`
                    : `${feedType} categories`}
                </h2>
                <FeedNav
                  feedType={feedType}
                  setFeedType={setFeedType}
                  navItems={[FeedTypes.LATEST, FeedTypes.OLDEST]}
                />
              </header>
            }
          /> */}
        </div>
        <div></div>
      </Container>
    </Layout>
  );
};

export default CategoriesPage;
