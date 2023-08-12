import Container from "../../components/Container/Container";
import BrowseSearch from "../../components/Browse/BrowseSearch/BrowseSearch";
import BrowseLibs from "../../components/Browse/BrowseLibs/BrowseLibs";
import { useState } from "react";
const Browse = () => {
  const [search, setSearch] = useState("");
  return (
    <Container className="grid-aside py-12 gap-12">
      <BrowseSearch setSearch={setSearch} />
      <BrowseLibs search={search} setSearch={setSearch} />
    </Container>
  );
};

export default Browse;
