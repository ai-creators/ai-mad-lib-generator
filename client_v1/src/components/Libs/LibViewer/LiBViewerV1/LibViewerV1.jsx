import { useEffect, useState } from "react";
import Card from "../../../Card/Card";
import LibViewerReactions from "../LibViewerReactions/LibViewerReactions";
import { useParams } from "react-router-dom";
import LibResponse from "../../../../api/LibResponse";

const LibViewerV1 = () => {
  const { responseId } = useParams();
  const [lib, setLib] = useState(null);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    (async () => {
      if (responseId) {
        const response = await LibResponse.getById(responseId);
        console.log("RES: ", response);
        if (response.data) {
          setLib(response.data);
        }
      }
    })();
  }, [responseId]);
  console.log(lib, questions);
  const regex = /\[(.*?)\]/g;
  let index = 0;

  return lib ? (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col gap-5">
        <header className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold capitalize">{lib.prompt}...</h2>
        </header>
        {
          <p className="text-lg">
            {lib.text.split(" ").map((word, i) => {
              if (word.includes("[") && word.includes("]")) {
                const replaced = word.replace(regex, questions[index].answer);
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
    </div>
  ) : null;
};

export default LibViewerV1;
