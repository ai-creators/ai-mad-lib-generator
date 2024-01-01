import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogin from "../../components/button/button-login/ButtonLogin";
import ButtonSignup from "../../components/button/button-signup/ButtonSignup";
import Card from "../../components/card/Card";
import Container from "../../components/container/Container";
import Layout from "../../layout/Layout";
import ButtonLight from "../../components/button/button-light/ButtonLight";
import NavbarItems from "../../components/navbar/navbar-items/NavbarItems";
import AdlibSearch from "../../components/adlib/adlib-search/AdlibSearch";
import FeedNav from "../../components/feed/feed-nav/FeedNav";
import { useState } from "react";
import { FeedTypes } from "../../components/feed/FeedTypes";
import Feed from "../../components/feed/Feed";
import { AdlibModel } from "../../models/AdlibModel";
import { ApiResponse } from "../../models/ApiResponseModel";
import { PaginationResponse } from "../../models/PaginationResponse";
import AdlibService from "../../services/AdlibService";
import { useSearchParams } from "react-router-dom";
import AdlibList from "../../components/adlib/adlib-list/AdlibList";

const BrowsePage = () => {
  const { isAuthenticated } = useAuth0();

  const [searchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.LATEST);

  const getAdlibs = async (
    page: number,
    size: number,
    timestamp: Date,
    abortController?: AbortController
  ): Promise<ApiResponse<PaginationResponse<AdlibModel>>> => {
    return AdlibService.getAdlibs(
      feedType,
      page,
      size,
      timestamp,
      abortController,
      search
    );
  };

  return (
    <Layout>
      <Container className="custom-grid gap-5 py-5">
        <aside className="flex-col gap-5 hidden lg:flex">
          {!isAuthenticated ? (
            <Card className="flex flex-col gap-5">
              <p>
                Join the Ai Adlibs community to save you're ai generated adlibs
              </p>
              <div className="flex flex-col gap-3">
                <ButtonSignup className="w-full" />
                <ButtonLogin className="w-full" />
              </div>
            </Card>
          ) : null}
          <NavbarItems />
        </aside>
        <section className="flex flex-col gap-5">
          <AdlibSearch />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                {search
                  ? `Search results for "${search}"`
                  : `"${feedType}" categories`}
              </p>
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
                  No more adlibs available
                </p>
              }
              feedType={feedType}
              search={search}
            />
          </div>
        </section>
        <div></div>
      </Container>
    </Layout>
  );
};

export default BrowsePage;
