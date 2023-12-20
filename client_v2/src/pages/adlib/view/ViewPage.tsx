import { useParams } from "react-router-dom";
import Card from "../../../components/card/Card";
import Container from "../../../components/container/Container";
import Layout from "../../../layout/Layout";
import AdlibResponseService from "../../../services/AdlibResponseService";
import { useQuery } from "@tanstack/react-query";
import ErrorAlert from "../../../components/errors/ErrorAlert";
import PageLoader from "../../../components/loader/page-loader/PageLoader";

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

  console.log(adlibResponse);

  return (
    <Layout>
      <Container>
        {isLoading ? <PageLoader /> : null}
        {error ? <ErrorAlert error={error} /> : null}
        <Card>
          <header>
            <h2></h2>
          </header>
        </Card>
      </Container>
    </Layout>
  );
};

export default ViewPage;
