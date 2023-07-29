import Container from "../../components/Container/Container";
import BrowseSearch from "../../components/Browse/BrowseSearch/BrowseSearch";
import BrowseLibs from "../../components/Browse/BrowseLibs/BrowseLibs";
const Browse = () => {
  return (
    <Container className="grid-aside py-12 gap-12">
      <BrowseSearch />
      <BrowseLibs />
    </Container>
  );
};

export default Browse;
