import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import LibsBuilderV1 from "../../../components/Libs/LibsBuilder/LibsBuilderV1/LibsBuilderV1";

const LibsPlay = () => {
  const { lib } = useLocation().state;
  console.log("LIB: ", lib);
  const navigate = useNavigate();
  if (!lib) {
    navigate("/", { state: { error: "No ad-lib found." } });
  }
  return (
    <Container className="grid-aside py-12 gap-12">
      {lib && <LibsBuilderV1 lib={lib} />}
    </Container>
  );
};

export default LibsPlay;
