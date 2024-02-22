import ErrorAlert from "@/errors/ErrorAlert";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import { useAdlibPlay } from "./AdlibPlay.hooks";
import PageLoader from "@/components/loader/page-loader/PageLoader";
import AdlibBuilder from "@/features/adlib/adlib-builder/AdlibBuilder";
import { Card } from "@/components/ui/card";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";

const AdlibPlay = () => {
  const { adlib, isLoading, error } = useAdlibPlay();
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <Layout>
      <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
        <aside className="hidden lg:flex flex-col gap-5 col-span-3">
          <Card className="p-2">
            <NavbarSidebar />
          </Card>
        </aside>
        <section className="flex flex-col gap-5 col-span-9">
          <ErrorAlert error={error} />
          {adlib ? <AdlibBuilder adlib={adlib} /> : null}
        </section>
      </Container>
    </Layout>
  );
};

export default AdlibPlay;
