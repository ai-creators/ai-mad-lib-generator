import Container from "@/layout/container/Container";
import Layout from "../../layout/Layout";
import AdlibCreateCard from "@/features/adlib/adlib-create/adlib-create-card/AdlibCreateCard";

const Home = () => {
  return (
    <Layout>
      <div data-testid="home">
        <Container className="px-3 lg:px-0 py-5 grid-cols-9 grid gap-5">
          <section className="col-span-9 lg:col-span-6">
            <AdlibCreateCard />
          </section>
          <aside className="col-span-3 "></aside>
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
