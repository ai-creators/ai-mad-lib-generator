import { useAuth0 } from "@auth0/auth0-react";
import Card from "../../components/card/Card";
import Container from "../../components/container/Container";
import CreateAdlibCard from "../../components/create/create-adlib-card/CreateAdlibCard";
import NavbarItems from "../../components/navbar/navbar-items/NavbarItems";
import Layout from "../../layout/Layout";
import ButtonLogin from "../../components/button/button-login/ButtonLogin";
import ButtonSignup from "../../components/button/button-signup/ButtonSignup";
import Feed from "../../components/feed/Feed";
import FeedNav from "../../components/feed/feed-nav/FeedNav";
import { useState } from "react";
import { FeedTypes } from "../../components/feed/FeedTypes";
import AdlibService from "../../services/AdlibService";
import { ErrorModel } from "../../models/ErrorModel";
import { PaginationResponse } from "../../models/PaginationResponse";
import { AdlibModel } from "../../models/AdlibModel";
import AdlibList from "../../components/adlib/adlib-list/AdlibList";
import ErrorAlert from "../../components/errors/ErrorAlert";

const HomePage = () => {
  const { isAuthenticated } = useAuth0();

  const [feedType, setFeedType] = useState<FeedTypes>(FeedTypes.FEATURED);
  const [error, setError] = useState<ErrorModel | null>(null);

  const getAdlibs = async (
    page: number,
    size: number,
    timestamp: Date
  ): Promise<PaginationResponse<AdlibModel>> => {
    const { data, error } = await AdlibService.getAdlibs(
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
          <CreateAdlibCard />
          <div className="flex flex-col gap-3">
            <ErrorAlert error={error} />
            <FeedNav
              feedType={feedType}
              setFeedType={setFeedType}
              navItems={[FeedTypes.FEATURED, FeedTypes.LATEST]}
            />
            <Feed<AdlibModel>
              executable={getAdlibs}
              ListComponent={AdlibList}
              error={error}
              endMessage={
                <p className="pt-5 px-4 font-semibold">
                  No more adlibs available
                </p>
              }
            />
          </div>
        </section>
        <section></section>
      </Container>
    </Layout>
  );
};

export default HomePage;
