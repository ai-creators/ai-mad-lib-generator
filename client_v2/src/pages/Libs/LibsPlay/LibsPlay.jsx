import { useParams } from "react-router-dom";
import Container from "../../../components/Container/Container";
import LibsBuilderV1 from "../../../components/Libs/LibsBuilder/LibsBuilderV1/LibsBuilderV1";
import ErrorAlert from "../../../errors/ErrorAlert";
import { useEffect, useState } from "react";
import Lib from "../../../api/Lib";

const LibsPlay = () => {
  const { adlibid } = useParams();
  const [lib, setLib] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      if (adlibid) {
        const response = await Lib.getById(adlibid);
        if (response.data) {
          setLib(response.data);
        } else {
          setError({
            message:
              "Unable to find adlib. The creator of the adlib could've deleted the adlib.",
          });
        }
      }
    })();
  }, [adlibid]);
  return (
    <>
      <Container>
        <ErrorAlert error={error} className="mt-5" />
      </Container>
      <Container className="grid-aside py-12 gap-12">
        {lib && <LibsBuilderV1 lib={lib} />}
      </Container>
    </>
  );
};

export default LibsPlay;
