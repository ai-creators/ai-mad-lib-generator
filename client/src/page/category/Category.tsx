import { Card } from "@/components/ui/card";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";
import { useCategory } from "./Category.hooks";
import CategoryCard from "@/features/categories/category-card/CategoryCard";
import ErrorAlert from "@/errors/ErrorAlert";
import Feed from "@/components/feed/Feed";
import AdlibList from "@/features/adlib/adlib-list/AdlibList";

const Category = () => {
  const { category, error, getAdlibs } = useCategory();
  return (
    <Layout>
      <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
        <aside className="hidden lg:flex flex-col gap-5 col-span-3">
          <Card className="p-2">
            <NavbarSidebar />
          </Card>
        </aside>
        <section className="col-span-12 lg:col-span-9 flex flex-col gap-5">
          <ErrorAlert error={error} />
          {category ? <CategoryCard category={category} /> : null}
          {
            <Card className="p-5">
              <Feed
                ListComponent={AdlibList}
                executable={getAdlibs}
                endMessage={
                  <p className="pt-5 px-0 font-semibold">
                    No more adlibs available
                  </p>
                }
              />
            </Card>
          }
        </section>
      </Container>
    </Layout>
  );
};

export default Category;
