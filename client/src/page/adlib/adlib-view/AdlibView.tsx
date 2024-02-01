import PageLoader from "@/components/loader/page-loader/PageLoader";
import { useAdlibView } from "./AdlibView.hooks";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import AdlibViewer from "@/features/adlib/adlib-viewer/AdlibViewer";
import ErrorAlert from "@/errors/ErrorAlert";

const AdlibView = () => {
  const { response, isLoading, error } = useAdlibView();

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <Layout>
      <Container className="px-3 lg:px-0 py-5 grid-cols-9 grid gap-5">
        <section className="col-span-9 lg:col-span-6 flex flex-col gap-5">
          <ErrorAlert error={error} />
          {response ? <AdlibViewer response={response} /> : null}
        </section>
        <aside className="col-span-3 "></aside>
      </Container>
    </Layout>
  );
};

export default AdlibView;
