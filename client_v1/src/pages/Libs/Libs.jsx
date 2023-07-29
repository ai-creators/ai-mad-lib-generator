import Container from "../../components/Container/Container";
import LibsCreate from "../../components/Libs/LibsCreate/LibsCreate";
import LibsFeatured from "../../components/Libs/LibsFeatured/LibsFeatured";

const Libs = () => {
  return (
    <Container className="grid-aside py-12 gap-12">
      <LibsCreate />
      <LibsFeatured />
    </Container>
  );
};

export default Libs;
