import { useParams } from "react-router-dom";
import Container from "../../../components/Container/Container";
import LibsBuilderV1 from "../../../components/Libs/LibsBuilder/LibsBuilderV1/LibsBuilderV1";
import { useEffect, useState } from "react";
import Lib from "../../../api/Lib";

const LibsPlay = () => {
  const { adlibid } = useParams();
  const [lib, setLib] = useState(null);
  useEffect(() => {
    (async () => {
      if (adlibid) {
        const response = await Lib.getById(adlibid);
        if (response.data) {
          setLib(response.data);
        }
      }
    })();
  }, [adlibid]);
  return (
    <Container className="grid-aside py-12 gap-12">
      {lib && <LibsBuilderV1 lib={lib} />}
    </Container>
  );
};

export default LibsPlay;
