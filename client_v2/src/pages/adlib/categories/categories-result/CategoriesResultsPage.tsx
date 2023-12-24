import { useState } from "react";
import { useParams } from "react-router-dom";
import CategoryService from "../../../../services/CategoryService";
import { FeedTypes } from "../../../../components/feed/FeedTypes";
import Container from "../../../../components/container/Container";
import Layout from "../../../../layout/Layout";
import FeedNav from "../../../../components/feed/feed-nav/FeedNav";
import Feed from "../../../../components/feed/Feed";
import NavbarItems from "../../../../components/navbar/navbar-items/NavbarItems";
import Card from "../../../../components/card/Card";

const CategoriesResultsPage = () => {
  const { categoryName } = useParams();
  const [timestamp] = useState<Date>(new Date());

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(25);

  const getAdlibs = () => {
    return CategoryService.getAdlibsByCategory(
      categoryName ?? "",
      feedType,
      timestamp,
      page,
      size
    );
  };

  return (
    <Layout>
      <Container>
        <aside className="flex flex-col gap-5">
          <NavbarItems />
        </aside>
        <div className="flex flex-col gap-5">
          <Card>
            <h2>Results for #{categoryName}</h2>
            <p className="text-zinc-500">100 results</p>
          </Card>
          <Feed
            executable={getAdlibs}
            setPage={setPage}
            feedType={categoryName + feedType}
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

export default CategoriesResultsPage;
