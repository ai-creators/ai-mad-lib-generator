import Container from "../../components/container/Container";
import NavbarItems from "../../components/navbar/navbar-items/NavbarItems";
import Layout from "../../layout/Layout";
import AdlibCreate from "../../components/adlib/adlib-create/AdlibCreate";

const CreatePage = () => {
  return (
    <Layout>
      <Container className="grid-aside gap-5 my-5">
        <aside className="flex flex-col gap-5 hidden lg:block">
          <NavbarItems />
        </aside>
        <div className="flex flex-col gap-5">
          <AdlibCreate />
        </div>
        <div></div>
      </Container>
    </Layout>
  );
};

export default CreatePage;
