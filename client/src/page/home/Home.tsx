import Container from "@/layout/container/Container";
import Layout from "../../layout/Layout";
import AdlibCreateCard from "@/features/adlib/adlib-create/adlib-create-card/AdlibCreateCard";

const Home = () => {
  return (
    <Layout>
      <Container className="py-5">
        <div>
          <AdlibCreateCard />
        </div>
        <aside></aside>
      </Container>
    </Layout>
  );
};

export default Home;
