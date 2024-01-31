import ErrorAlert from "@/errors/ErrorAlert";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import { useAdlibPlay } from "./AdlibPlay.hooks";
import PageLoader from "@/components/loader/page-loader/PageLoader";
import AdlibBuilder from "@/features/adlib/adlib-builder/AdlibBuilder";

const AdlibPlay = () => {
  const { adlib, isLoading, error } = useAdlibPlay();

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <Layout>
      <div data-testid="home">
        <Container className="px-3 lg:px-0 py-5">
          <section className="flex flex-col gap-5">
            <ErrorAlert error={error} />
            {adlib ? <AdlibBuilder adlib={adlib} /> : null}
          </section>
        </Container>
      </div>
    </Layout>
  );
};

export default AdlibPlay;
