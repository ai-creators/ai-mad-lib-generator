import React, { useState } from "react";
import { AdlibResponseModel } from "../../../models/AdlibResponseModel";
import { ErrorModel } from "../../../models/ErrorModel";
import Card from "../../card/Card";

type Props = {
  response: AdlibResponseModel;
};

const AdlibViewer = ({ response }: Props) => {
  const [error, setError] = useState<ErrorModel | null>(null);

  const regex = /\[(.*?)\]/g;
  let index = 0;

  return response ? (
    <>
      <Card className="flex flex-col gap-5">
        <header className="flex flex-col">
          <h2 className="text-xl font-semibold">{response.adlib.title}</h2>
          <p className="text-zinc-500 text-sm">
            Prompt: {response.adlib.prompt}...
          </p>
        </header>
        <div>
          <p className="text-lg">
            {response.adlib.body.split(" ").map((word, i) => {
              console.log("IN HERE", word);
              if (word.includes("[") && word.includes("]")) {
                const replaced = word.replace(
                  regex,
                  response.questions[index].answer
                );
                console.log("REPLACE ", i, replaced);
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
