import React from "react";

const MadLibViewer = ({ text, questions }) => {
  const regex = /\[(.*?)\]/g;
  let index = 0;
  return text ? (
    <p>
      {text
        .split(" ")
        .map((word, i) => {
          if (word.includes("[") && word.includes("]")) {
            const replaced = word.replace(regex, questions[index].answer);
            index++;
            return (
              <b className="font-bold" key={word + i}>
                {replaced}
              </b>
            );
          }
          return word;
        })
        .join(" ")}
    </p>
  ) : null;
};

export default MadLibViewer;
