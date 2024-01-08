import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogin from "../../../components/button/button-login/ButtonLogin";
import ButtonSignup from "../../../components/button/button-signup/ButtonSignup";
import Card from "../../../components/card/Card";
import Container from "../../../components/container/Container";
import NavbarItems from "../../../components/navbar/navbar-items/NavbarItems";
import Layout from "../../../layout/Layout";
import { useResponsePage } from "./ResponsesPage.hooks";
import Feed from "../../../components/feed/Feed";
import { AdlibResponseModel } from "../../../models/AdlibResponseModel";
import AdlibResponseList from "../../../components/adlib/adlib-response/adlib-response-list/AdlibResponseList";
import AdlibCard from "../../../components/adlib/adlib-card/AdlibCard";
import { HiddenButtonTypes } from "../../../components/adlib/adlib-card/AdlibHiddenButtonTypes";
import AdlibCategoriesCard from "../../../components/adlib/adlib-categories/adlib-categories-card/AdlibCategoriesCard";

const ResponsesPage = () => {
  const { isAuthenticated } = useAuth0();
  const { adlib, getAdlibRespnses, feedType } = useResponsePage();
  return (
    <Layout>
      <Container className="grid-aside py-5 gap-5">
        <aside className="flex flex-col gap-5">
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
          {adlib ? (
            <AdlibCard
              adlib={adlib}
              hideButtons={[HiddenButtonTypes.RESPONSE]}
            />
          ) : null}

          <div>
            <h4 className="mb-3 font-semibold">Responses</h4>
            <Feed<AdlibResponseModel>
              executable={getAdlibRespnses}
              ListComponent={AdlibResponseList}
              endMessage={
                <p className="pt-5 px-4 font-semibold">
                  No more responses available
                </p>
              }
              feedType={feedType}
            />
          </div>
        </section>
        <div className="flex flex-col gap-5">
          {adlib?.categories ? <AdlibCategoriesCard adlib={adlib} /> : null}
        </div>
      </Container>
    </Layout>
  );
};

export default ResponsesPage;
