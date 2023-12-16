import { useEffect, useState } from "react";
import AdlibBuilder from "../../../components/adlib/adlib-builder/AdlibBuilder";
import Container from "../../../components/container/Container";
import Layout from "../../../layout/Layout";
import { AdlibModel } from "../../../models/AdlibModel";
import { ErrorModel } from "../../../models/ErrorModel";
import AdlibService from "../../../services/AdlibService";
import { useParams } from "react-router-dom";
import ErrorAlert from "../../../components/errors/ErrorAlert";
import PageLoader from "../../../components/loader/page-loader/PageLoader";

type Props = {};

const PlayPage = (props: Props) => {
  const [adlib, setAdlib] = useState<AdlibModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const { adlibId } = useParams();

  useEffect(() => {
    (async () => {
      if (!adlibId) {
        setError({ message: "No adlib id provided" });
        return;
      }
      setIsLoading(true);
      setError(null);
      const { data, error } = await AdlibService.findAdlibById(+adlibId);

      if (data) {
        setAdlib(data);
      }

      if (error) {
        setError(error);
      }
      setIsLoading(false);
    })();
  }, [adlibId]);
  return (
    <Layout>
      <Container className="custom-grid gap-5 py-5">
        <aside></aside>
        <section>
          <ErrorAlert error={error} setError={setError} />
          {isLoading ? <PageLoader /> : null}
          {adlib ? <AdlibBuilder adlib={adlib} /> : null}
        </section>
        <section></section>
      </Container>
    </Layout>
  );
};

export default PlayPage;
