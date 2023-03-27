import React from "react";

const MadLibViewer = ({ text, questions }) => {
  const regex = /\[(.*?)\]/g;
  let index = 0;
  console.log(questions);
  return text ? (
    <p className="text-lg">
      {text.split(" ").map((word, i) => {
        if (word.includes("[") && word.includes("]")) {
          const replaced = word.replace(regex, questions[index].answer);
          index++;
          return <b className="rainbow">{replaced} </b>;
        }
        return word + " ";
      })}
    </p>
  ) : null;
};

export default MadLibViewer;
