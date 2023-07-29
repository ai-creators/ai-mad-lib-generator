import Container from "../../components/Container/Container";
import LibsCreate from "../../components/Libs/LibsCreate/LibsCreate";
import LibsFeatured from "../../components/Libs/LibsFeatured/LibsFeatured";

const Libs = () => {
  return (
    <Container className="grid-aside py-12 gap-12 px-3">
      <LibsCreate />
      <aside className="hidden lg:block">
        <h3 className="text-2xl font-semibold">Featured Ad-Libs</h3>
        <p className="text-zinc-400">View</p>
      </aside>

      <LibsFeatured />
    </Container>
  );
};

export default Libs;
