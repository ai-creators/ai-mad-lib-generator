import React, { useEffect, useMemo, useState } from "react";
import MadLibViewer from "../MadLibViewer/MadLibViewer";

const MadLibBuilder = ({ madLib }) => {
  const [formattedMadLib, setFormattedMadLib] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isBuilderDone, setIsBuilderDone] = useState(false);
  const [isMadLibShowing, setIsMadLibShowing] = useState(false);
  console.log("MadLIBBY: ", madLib);
  useEffect(() => {
    if (madLib) {
      setQuestions([]);
      setIsMadLibShowing(false);
    }
  }, [madLib]);

  useMemo(() => {
    if (madLib && questions.length === 0) {
      let questionType = "";
      let isInBracket = false;
      for (let i = 0; i < madLib.length; i++) {
        const letter = madLib[i];
        if (letter === "]") {
          isInBracket = false;
          const question = {
            question: questionType,
            answer: "",
          };
          setQuestions((curr) => [...curr, question]);
          questionType = "";
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

  console.log("QUESTIONS: ", questions);
  const changeAnswers = ({ target }) => {
    const index = parseInt(target.getAttribute("data-index"));
    console.log(target.value, index);
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
  return isBuilderDone ? (
    <>
      <form className="flex flex-col gap-3" data-testid="madlib-builder-form">
        <h3>Answers for Mad Lib</h3>
        {!isMadLibShowing &&
          questions.map((question, index) => {
            console.log();
            return (
              <div key={index} className="flex flex-col gap-2">
                <label htmlFor={question.question + index}>
                  {question.question}
                </label>
                <input
                  id={question.question + index}
                  type="text"
                  value={question.answer}
                  className="border rounded py-2 px-3 w-full drop-shadow-sm focus:drop-shadow-xl ease-out duration-300 outline-offset-4"
                  onChange={changeAnswers}
                  data-index={index}
                />
              </div>
            );
          })}
        <div>
          <button
            className="py-2 px-3 border rounded font-semibold text-white bg-gray-900"
            onClick={createMadLib}
          >
            Create Mad Lib
          </button>
        </div>
      </form>
      {isMadLibShowing && <MadLibViewer text={madLib} questions={questions} />}
    </>
  ) : (
    <p data-testid="no-madlib-text">No MadLib provided</p>
  );
};

export default MadLibBuilder;
