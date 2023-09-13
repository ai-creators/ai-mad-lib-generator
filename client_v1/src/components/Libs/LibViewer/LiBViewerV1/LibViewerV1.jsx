import { useEffect, useState } from "react";
import Card from "../../../Card/Card";
import LibViewerReactions from "../LibViewerReactions/LibViewerReactions";
import { useParams } from "react-router-dom";
import LibResponse from "../../../../api/LibResponse";
import ErrorAlert from "../../../../errors/ErrorAlert";
import ApiErrorHandler from "../../../../errors/ApiErrorHandler";
import Container from "../../../Container/Container";

const LibViewerV1 = () => {
  const { responseid } = useParams();
  const [lib, setLib] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        if (responseid) {
          const response = await LibResponse.getById(responseid);
          if (response.data) {
            setLib(response.data.adlib);
            setQuestions(response.data.questions);
          }
        }
      } catch (e) {
        setError(ApiErrorHandler.handleRequestResponse(e));
      }
    })();
  }, [responseid]);
  console.log(lib, questions);
  const regex = /\[(.*?)\]/g;
  let index = 0;

  return (
    <>
      <Container className="grid-aside py-12 gap-12">
        <ErrorAlert error={error} />
        {lib ? (
          <>
            <Card className="flex flex-col gap-5">
              <header className="flex flex-col gap-5">
                <h2 className="text-xl font-semibold capitalize">
                  {lib.prompt}...
                </h2>
              </header>
              {
                <p className="text-lg">
                  {lib.text.split(" ").map((word, i) => {
                    if (word.includes("[") && word.includes("]")) {
                      const replaced = word.replace(
                        regex,
                        questions[index].answer
                      );
                      index++;
                      return (
                        <b
                          key={i}
                          className="tracking-wide font-bold underline underline-offset-4"
                        >
                          {replaced}{" "}
                        </b>
                      );
                    }
                    return word + " ";
                  })}
                </p>
              }
            </Card>
            <LibViewerReactions lib={lib} />
          </>
        ) : null}
      </Container>
    </>
  );
};

export default LibViewerV1;
