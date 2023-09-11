import Card from "../../Card/Card";
import LibViewerReactions from "./LibViewerReactions/LibViewerReactions";

const LibViewer = ({ lib, questions }) => {
  console.log(lib, questions);
  const { text } = lib;
  const regex = /\[(.*?)\]/g;
  let index = 0;

  return text ? (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col gap-5">
        <header className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold capitalize">{lib.prompt}...</h2>
        </header>
        {
          <p className="text-lg">
            {text.split(" ").map((word, i) => {
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

export default LibViewer;
