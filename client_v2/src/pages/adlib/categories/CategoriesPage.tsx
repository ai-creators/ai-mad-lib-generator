import { useParams, useSearchParams } from "react-router-dom";
import Container from "../../../components/container/Container";
import Layout from "../../../layout/Layout";
import ButtonLight from "../../../components/button/button-light/ButtonLight";
import { useState } from "react";
import Feed from "../../../components/feed/Feed";
import CategoryService from "../../../services/CategoryService";
import NavbarItems from "../../../components/navbar/navbar-items/NavbarItems";
import AdlibCategoriesSearchCard from "../../../components/adlib/adlib-categories/adlib-categories-search-card/AdlibCategoriesSearchCard";
import FeedNav from "../../../components/feed/feed-nav/FeedNav";
import { FeedTypes } from "../../../components/feed/FeedTypes";

const CategoriesPage = () => {
  const [searchParmas] = useSearchParams();

  const categoryName = searchParmas.get("q");

  const [timestamp] = useState<Date>(new Date());
  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(25);

  const getCategories = () => {
    return CategoryService.getCategories(
      categoryName ?? "",
      feedType,
      timestamp,
      page,
      size
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
          <Feed
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
          />
        </div>
        <div></div>
      </Container>
    </Layout>
  );
};

export default CategoriesPage;
