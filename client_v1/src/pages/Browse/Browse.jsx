import Container from "../../components/Container/Container";
import BrowseLibs from "../../components/BrowseLibs/BrowseLibs";
import Layout from "../../layout/Layout";
const Browse = () => {
  return (
    <Layout>
      <Container className="grid-aside py-12 gap-12 px-3">
        <BrowseLibs />
        <aside>
          <h3 className="text-2xl font-semibold">Featured Ad-Libs</h3>
        </aside>
      </Container>
    </Layout>
  );
};

export default Browse;
