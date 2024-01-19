import Layout from "../../layout/Layout";
import ErrorAlert from "../../components/errors/ErrorAlert";
import Card from "../../components/card/Card";
import PageLoader from "../../components/loader/page-loader/PageLoader";
import Container from "../../components/container/Container";
import ProfileCard from "../../components/profile/profile-card/ProfileCard";
import AdlibCategoriesCard from "../../components/adlib/adlib-categories/adlib-categories-card/AdlibCategoriesCard";
import ButtonPrimary from "../../components/button/button-primary/ButtonPrimary";
import ButtonLight from "../../components/button/button-light/ButtonLight";
import { useAdlibPage } from "./AdlibPage.hooks";
import { useAppSelector } from "../../hooks/useAppSelector";
import NavbarItems from "../../components/navbar/navbar-items/NavbarItems";
import AdlibReactions from "../../components/adlib/adlib-reactions/AdlibReactions";

const AdlibPage = () => {
  const { account } = useAppSelector((state) => state.account);
  const {
    adlib,
    isLoading,
    hasBookmarked,
    error,
    bookmarkAdlib,
    bookmarkAdlibLocally,
    hasLiked,
    likeAdlib,
    likeOffsetCount,
  } = useAdlibPage();

  const confirmAcountSetup = () => {
    if (account?.id) {
      bookmarkAdlib();
    } else {
      bookmarkAdlibLocally();
    }
  };

  return isLoading ? (
    <PageLoader />
  ) : (
    <Layout>
      <Container className="grid-aside py-5 gap-5">
        <aside className="flex flex-col gap-5">
          <NavbarItems />
        </aside>
        <div className="flex flex-col gap-5">
          {error ? <ErrorAlert error={error} /> : null}
          <Card className="flex flex-col gap-5">
            <header>
              <h2 className="text-xl font-semibold">{adlib?.title}</h2>
              <p className="text-zinc-500">Prompt: {adlib?.prompt}...</p>
            </header>

            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <ButtonPrimary href={`/adlib/play/${adlib?.id}`}>
                  Go to Adlib
                </ButtonPrimary>
                <ButtonLight href={`/adlib/${adlib?.id}/responses`}>
                  Go to Responses
                </ButtonLight>
              </div>
              <div className="flex items-center gap-1">
                <AdlibReactions />
                {/* <div className="flex items-center gap-5">
                  <ButtonLight
                    className="flex gap-2 items-center"
                    hideUnerline
                    onClick={likeAdlib}
                  >
                    <i
                      className={`fa-${
                        hasLiked ? "solid" : "regular"
                      } fa-heart`}
                    ></i>{" "}
                    <span>
                      {(adlib?.reactions ? adlib.reactions.length : 0) +
                        likeOffsetCount}{" "}
                      Likes
                    </span>
                  </ButtonLight>
                </div> */}
                <ButtonLight
                  size="w-10 h-10"
                  className="flex justify-center items-center"
                  hideUnerline
                  onClick={confirmAcountSetup}
                >
                  <i
                    className={`fa-${
                      hasBookmarked ? "solid" : "regular"
                    } fa-bookmark`}
                  ></i>
                </ButtonLight>
              </div>
            </div>
          </Card>
          {/*<AdlibComment />*/}
        </div>
        <div className="flex flex-col gap-5">
          {adlib?.createdBy ? <ProfileCard profile={adlib.createdBy} /> : null}
          {adlib?.categories ? <AdlibCategoriesCard adlib={adlib} /> : null}
        </div>
      </Container>
    </Layout>
  );
};

export default AdlibPage;
