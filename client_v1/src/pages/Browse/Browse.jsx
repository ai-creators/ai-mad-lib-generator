import Container from "../../components/Container/Container";
import BrowseSearch from "../../components/Browse/BrowseSearch/BrowseSearch";
import BrowseLibs from "../../components/Browse/BrowseLibs/BrowseLibs";
const Browse = () => {
  return (
    <Container className="grid-aside py-12 gap-12 px-3">
      <BrowseSearch />
      <aside>
        <h3 className="text-2xl font-semibold">Search Ad-Libs</h3>
      </aside>
      <BrowseLibs />
    </Container>
  );
};

export default Browse;
