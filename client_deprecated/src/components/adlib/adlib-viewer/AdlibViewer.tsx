import { AdlibResponseModel } from "../../../models/AdlibResponseModel";
import Card from "../../card/Card";
import { Link } from "react-router-dom";

type Props = {
  response: AdlibResponseModel;
};

const AdlibViewer = ({ response }: Props) => {
  // const [error, setError] = useState<ErrorModel | null>(null);

  const regex = /\[(.*?)\]/g;
  let index = 0;

  return response ? (
    <>
      <Card className="flex flex-col gap-5">
        <header className="flex flex-col">
          <Link
            to={`/adlib/${response.adlib.id}`}
            className="hover:underline underline-offset-2"
          >
            <h2 className="text-xl font-semibold">{response.adlib.title}</h2>
          </Link>

          <p className="text-zinc-500 text-sm">
            Prompt: {response.adlib.prompt}...
          </p>
        </header>
        <div>
          <p className="text-lg">
            {response.adlib.body.split(" ").map((word, i) => {
              if (word.includes("[") && word.includes("]")) {
                const replaced = word.replace(
                  regex,
                  response.questions[index].answer
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
        </div>
      </Card>
    </>
  ) : null;
};

export default AdlibViewer;
