import { useParams } from "react-router-dom";
import Container from "../../../components/container/Container";
import Layout from "../../../layout/Layout";
import AdlibResponseService from "../../../services/AdlibResponseService";
import { useQuery } from "@tanstack/react-query";
import ErrorAlert from "../../../components/errors/ErrorAlert";
import PageLoader from "../../../components/loader/page-loader/PageLoader";
import AdlibViewer from "../../../components/adlib/adlib-viewer/AdlibViewer";
import AdlibCategoriesCard from "../../../components/adlib/adlib-categories/adlib-categories-card/AdlibCategoriesCard";
import ProfileCard from "../../../components/profile-card/ProfileCard";

const ViewPage = () => {
  const { adlibResponseId } = useParams();

  const fetchAdlibResponse = async () => {
    if (adlibResponseId) {
      const { data, error } = await AdlibResponseService.findById(
        +adlibResponseId
      );
      if (data) {
        return data;
      }
      if (error) {
        throw new Error(
          error.message ?? "Error getting adlib response information"
        );
      }
    } else {
      throw new Error("No adlib response id has been provided");
    }
  };

  const {
    data: adlibResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adlibResponse"],
    queryFn: fetchAdlibResponse,
  });

  return (
    <Layout>
      <Container className="grid-with-aside gap-5 my-5">
        {isLoading ? <PageLoader /> : null}
        <aside className="flex flex-col gap-5">
          {adlibResponse?.createdBy ? (
            <ProfileCard profile={adlibResponse.createdBy} />
          ) : null}
          {adlibResponse ? (
            <AdlibCategoriesCard adlib={adlibResponse.adlib} />
          ) : null}
        </aside>
        <div>
          {error ? <ErrorAlert error={error} /> : null}
          {adlibResponse ? <AdlibViewer response={adlibResponse} /> : null}
        </div>
      </Container>
    </Layout>
  );
};

export default ViewPage;
