import React, { useEffect, useState } from "react";

const MadLibBuilder = ({ madlib }) => {
  const [answers, setAnswers] = useState([]);
  const [formattedMadLib, setFormattedMadLib] = useState("");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (madlib) {
      let questionType = "";
      let isInBracket = false;
      for (const letter of madlib) {
        if (letter === "[") {
          isInBracket = true;
        }
        if (letter === "]") {
          isInBracket = false;
          const question = {
            question: questionType,
            answer: "",
          };
        }
        if (isInBracket) {
          questionType += letter;
        }
      }
    }
  }, [madlib]);

  return <form></form>;
};

export default MadLibBuilder;
