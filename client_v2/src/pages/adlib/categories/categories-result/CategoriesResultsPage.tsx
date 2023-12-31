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
import { AdlibModel } from "../../../../models/AdlibModel";
import AdlibList from "../../../../components/adlib/adlib-list/AdlibList";
import { ApiResponse } from "../../../../models/ApiResponseModel";
import { PaginationResponse } from "../../../../models/PaginationResponse";

const CategoriesResultsPage = () => {
  const { categoryName: category } = useParams();

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);

  const getAdlibs = (
    page: number,
    size: number,
    timestamp: Date,
    abortController?: AbortController
  ): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
    return CategoryService.getAdlibsByCategory(
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
          <Card>
            <h1>{category}</h1>
          </Card>

          <div className="flex justify-between items-center">
            <FeedNav
              feedType={feedType}
              setFeedType={setFeedType}
              navItems={[FeedTypes.LATEST, FeedTypes.OLDEST]}
              className="ml-auto"
            />
          </div>
          <Feed<AdlibModel>
            executable={getAdlibs}
            ListComponent={AdlibList}
            endMessage={
              <p className="pt-5 px-4 font-semibold">
                No more Categories available
              </p>
            }
            feedType={feedType}
          />
        </div>
        <div></div>
      </Container>
    </Layout>
  );
};

export default CategoriesResultsPage;
