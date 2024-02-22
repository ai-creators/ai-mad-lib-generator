import { Card } from "@/components/ui/card";
import AdlibBrowse from "@/features/adlib/adlib-browse/AdlibBrowse";
import AdlibSearch from "@/features/adlib/adlib-search/AdlibSearch";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";

const Browse = () => {
  return (
    <Layout>
      <div data-testid="browse">
        <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
          <aside className="hidden lg:flex flex-col gap-5 col-span-3">
            <Card className="p-2">
              <NavbarSidebar />
            </Card>
          </aside>
          <section className="col-span-12 lg:col-span-9 flex flex-col gap-5">
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
