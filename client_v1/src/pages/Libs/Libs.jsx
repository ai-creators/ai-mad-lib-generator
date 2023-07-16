import Container from "../../components/Container/Container";
import LibsCreate from "../../components/Libs/LibsCreate/LibsCreate";
import LibsFeatured from "../../components/Libs/LibsFeatured/LibsFeatured";
import Layout from "../../layout/Layout";

const Libs = () => {
  return (
    <Layout>
      <Container className="grid-aside py-12 gap-12 px-3">
        <LibsCreate />
        <aside>
          <h3 className="text-2xl font-semibold">Featured Ad-Libs</h3>
        </aside>

        <LibsFeatured />
      </Container>
    </Layout>
  );
};

export default Libs;
