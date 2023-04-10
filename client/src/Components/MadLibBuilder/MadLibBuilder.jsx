import React, { useEffect, useMemo, useState } from "react";
import MadLibViewer from "../MadLibViewer/MadLibViewer";
import { snakeToTitleCase } from "../../utils/snakeToTitleCase";
import { findNumberIndex } from "../../utils/findNumberIndex";

const MadLibBuilder = ({ madLib }) => {
  const [questions, setQuestions] = useState([]);
  const [isBuilderDone, setIsBuilderDone] = useState(false);
  const [isMadLibShowing, setIsMadLibShowing] = useState(false);
  useEffect(() => {
    if (madLib) {
      setQuestions([]);
      setIsMadLibShowing(false);
    }
  }, [madLib]);

  useMemo(() => {
    const madLibText = madLib.text;
    if (madLibText && questions.length === 0) {
      let questionType = "";
      let isInBracket = false;
      for (let i = 0; i < madLibText.length; i++) {
        const letter = madLibText[i];
        if (letter === "]") {
          isInBracket = false;
          if (
            !findNumberIndex(questionType) ||
            !questions.find((question) => question === questionType)
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

  const changeAnswers = ({ target }) => {
    const index = parseInt(target.getAttribute("data-index"));
    const updatedAnswer = questions[index];
    updatedAnswer.answer = target.value;
    setQuestions((curr) => {
      return [...curr.slice(0, index), updatedAnswer, ...curr.slice(index + 1)];
    });
  };

  const createMadLib = (event) => {
    event.preventDefault();
    setIsMadLibShowing(true);
  };
  if (isMadLibShowing) {
    return <MadLibViewer madLib={madLib} questions={questions} />;
  }
  return isBuilderDone ? (
    <>
      <form className="flex flex-col gap-3" data-testid="madlib-builder-form">
        {!isMadLibShowing &&
          questions.map((question, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={question.question + index}>
                  {snakeToTitleCase(question.question)}
                </label>
                <input
                  id={question.question + index}
                  type="text"
                  value={question.answer}
                  className="border rounded py-2 px-3 w-full drop-shadow-sm focus:drop-shadow-xl ease-out duration-300 outline-offset-4"
                  onChange={changeAnswers}
                  data-index={index}
                  required={true}
                />
              </div>
            );
          })}
        <div>
          <button
            className="py-2 px-3 rounded font-semibold text-white bg-gray-900"
            onClick={createMadLib}
          >
            Create Mad Lib
          </button>
        </div>
      </form>
    </>
  ) : (
    <p data-testid="no-madlib-text">No MadLib provided</p>
  );
};

export default MadLibBuilder;
