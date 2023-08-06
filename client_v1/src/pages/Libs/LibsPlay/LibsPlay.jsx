import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import LibsBuilder from "../../../components/Libs/LibsBuilder/LibsBuilder";

const LibsPlay = () => {
  const { lib } = useLocation().state;
  console.log("LIB: ", lib);
  const navigate = useNavigate();
  if (!lib) {
    navigate("/", { state: { error: "No ad-lib found." } });
  }
  return (
    <Container className="grid-aside py-12 gap-12">
      {lib && <LibsBuilder lib={lib} />}
    </Container>
  );
};

export default LibsPlay;
