import { useParams } from "react-router-dom";
import AdlibService from "../../services/AdlibService";
import { useQuery } from "@tanstack/react-query";
import Layout from "../../layout/Layout";
import ErrorAlert from "../../components/errors/ErrorAlert";
import Card from "../../components/card/Card";
import PageLoader from "../../components/loader/page-loader/PageLoader";
import Container from "../../components/container/Container";
import ProfileCard from "../../components/profile-card/ProfileCard";
import AdlibCategoriesCard from "../../components/adlib/adlib-categories/adlib-categories-card/AdlibCategoriesCard";
import ButtonPrimary from "../../components/button/button-primary/ButtonPrimary";
import ButtonLight from "../../components/button/button-light/ButtonLight";
import AdlibComment from "../../components/adlib/adlib-comment/AdlibComment";

const AdlibPage = () => {
  const { adlibId } = useParams();
  const fetchAdlib = async () => {
    if (!adlibId) {
      throw new Error("No adlib id has been provided");
    }
    const { data, error } = await AdlibService.findAdlibById(+adlibId);
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data;
    }
  };

  const {
    data: adlib,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adlib"],
    queryFn: fetchAdlib,
  });

  return isLoading ? (
    <PageLoader />
  ) : (
    <Layout>
      <Container className="grid-aside py-5 gap-5">
        <aside className="flex flex-col gap-5">
          {adlib?.createdBy ? <ProfileCard profile={adlib.createdBy} /> : null}
          {adlib?.categories ? <AdlibCategoriesCard adlib={adlib} /> : null}
        </aside>
        <div className="flex flex-col gap-5">
          {error && <ErrorAlert error={error} />}
          <Card className="flex flex-col gap-5">
            <header>
              <h2 className="text-xl font-semibold">{adlib?.title}</h2>
              <p className="text-zinc-500">Prompt: {adlib?.prompt}...</p>
            </header>

            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <ButtonPrimary>Go to Adlib</ButtonPrimary>
                <ButtonLight>Go to Responses</ButtonLight>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-5">
                  <ButtonLight className="flex gap-2 items-center" hideUnerline>
                    <i className="fa-regular fa-heart"></i>{" "}
                    <span>
                      {adlib?.reactions ? adlib.reactions.length : 0} reactions
                    </span>
                  </ButtonLight>
                </div>
                <ButtonLight
                  size="w-10 h-10"
                  className="flex justify-center items-center"
                  hideUnerline
                >
                  <i className="fa-regular fa-bookmark"></i>
                </ButtonLight>
              </div>
            </div>
          </Card>
          <AdlibComment />
        </div>
      </Container>
    </Layout>
  );
};

export default AdlibPage;
