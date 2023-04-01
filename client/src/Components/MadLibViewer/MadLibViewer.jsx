import React from "react";
import ButtonOutline from "../Button/ButtonOutline/ButtonOutline";
const MadLibViewer = ({ text, questions }) => {
  const regex = /\[(.*?)\]/g;
  let index = 0;
  console.log(questions);
  return text ? (
    <div>
      <div className="mb-3">
        {
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
        }
      </div>

      <div className="flex gap-2">
        <ButtonOutline>
          Like Lib <i class="fa-regular fa-heart ml-1"></i>
        </ButtonOutline>
      </div>
    </div>
  ) : null;
};

export default MadLibViewer;
