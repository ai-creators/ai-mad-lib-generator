import Container from "../../components/Container/Container";
import Layout from "../../layout/Layout";
import BrowseSearch from "../../components/Browse/BrowseSearch/BrowseSearch";
const Browse = () => {
  return (
    <Layout>
      <Container className="grid-aside py-12 gap-12 px-3">
        <BrowseSearch />
        <aside>
          <h3 className="text-2xl font-semibold">Search Ad-Libs</h3>
        </aside>
      </Container>
    </Layout>
  );
};

export default Browse;
