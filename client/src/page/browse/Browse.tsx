import AdlibBrowse from "@/features/adlib/adlib-browse/AdlibBrowse";
import AdlibSearch from "@/features/adlib/adlib-search/AdlibSearch";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";

const Browse = () => {
  return (
    <Layout>
      <div data-testid="browse">
        <Container
          className="px-3 lg:px-0 py-5 grid-cols-9 grid gap-5"
          width="max-w-3xl"
        >
          <section className="col-span-9 lg:col-span-9 flex flex-col gap-5">
            <AdlibSearch />
            <AdlibBrowse />
          </section>
          {/* <aside className="col-span-3"></aside> */}
        </Container>
      </div>
    </Layout>
  );
};

export default Browse;
