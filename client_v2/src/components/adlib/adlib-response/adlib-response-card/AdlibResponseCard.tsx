import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { AdlibResponseModel } from "../../../../models/AdlibResponseModel";
import Card from "../../../card/Card";

type Props = {
  response: AdlibResponseModel;
};

const AdlibResponseCard = ({ response }: Props) => {
  const regex = /\[(.*?)\]/g;
  let index = 0;

  console.log(response);
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {response?.createdBy ? (
          <Link
            to={`/profile/${response.createdBy.username}`}
            className="text-sm font-semibold capitalize hover:underline underline-offset-2 active:underline hover:text-indigo-800 active:text-indigo-800"
          >
            {response.createdBy.username}
          </Link>
        ) : (
          <p className="text-sm font-semibold">Anonymous</p>
        )}
        <p className="text-zinc-500 text-sm">
          {dayjs(response.createdAt).format("MMM, D")}
        </p>
      </div>
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
    </Card>
  );
};

export default AdlibResponseCard;
