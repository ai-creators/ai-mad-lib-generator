import { useEffect, useMemo, useState } from "react";
import Card from "../../Card/Card";
import { findNumberIndex } from "../../utils/findNumberIndex";
import LibViewer from "../LibViewer/LibViewer";

const LibsBuilder = ({ lib }) => {
  console.log("LIB: ", lib);
  const [questions, setQuestions] = useState([]);
  const [isBuilderDone, setIsBuilderDone] = useState(false);
  const [isAdLibShowing, setIsAdLibShowing] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (lib) {
      setQuestions([]);
      setIsAdLibShowing(false);
    }
  }, [lib.text]);

  useMemo(() => {
    const libText = lib.text;
    if (libText && questions.length === 0) {
      let questionType = "";
      let isInBracket = false;
      for (let i = 0; i < libText.length; i++) {
        const letter = libText[i];
        if (letter === "]") {
          isInBracket = false;
          if (
            !findNumberIndex(questionType) ||
            !questions.find((question) => question.question === questionType)
          ) {
            const question = {
              question: questionType,
              answer: "",
            };
            setQuestions((curr) => [...curr, question]);
            questionType = "";
          }
        }
        if (isInBracket) {
          questionType += letter;
        }
        if (letter === "[") {
          isInBracket = true;
        }
      }
      setIsBuilderDone(true);
    }
  }, [questions]);

  const changeAnswer = ({ target }) => {
    const index = parseInt(target.getAttribute("data-index"));
    const updatedAnswer = questions[index];
    updatedAnswer.answer = target.value;
    setQuestions((curr) => {
      return [...curr.slice(0, index), updatedAnswer, ...curr.slice(index + 1)];
    });
  };

  const createAdLib = (event) => {
    event.preventDefault();
    const newErrors = {};
    questions.forEach((question, index) => {
      if (question.answer.trim() === "") {
        newErrors[index] = "Please provide an answer";
      }
    });
    if (Object.keys(newErrors).length === 0) {
      setIsAdLibShowing(true);
    } else {
      setErrors(newErrors);
    }
  };

  if (isAdLibShowing) {
    return <LibViewer lib={lib} question={questions} />;
  }
  return (
    <Card>
      <header>
        <h2 className="text-xl font-semibold">{lib.prompt}...</h2>
      </header>
      <form></form>
    </Card>
  );
};

export default LibsBuilder;
