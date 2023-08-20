import { useEffect, useMemo, useState } from "react";
import Card from "../../Card/Card";
import { findNumberIndex } from "../../utils/findNumberIndex";
import LibViewer from "../LibViewer/LibViewer";
import { snakeToTitleCase } from "../../utils/snakeToTitleCase";
import FormInput from "../../Form/FormInput/FormInput";
import BadgeNSFW from "../../Badge/BadgeNSFW/BadgeNSFW";
import BadgePG from "../../Badge/BadgePG/BadgePG";

const LibsBuilder = ({ lib }) => {
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

  const removeErrorOnBlur = ({ target }) => {
    const index = parseInt(target.getAttribute("data-index"));
    if (index === 0 || index) {
      console.log(errors[index], questions[index]);
      if (errors[index] && questions[index].answer) {
        const errorsCopy = { ...errors };
        delete errorsCopy[index];
        setErrors(errorsCopy);
      }
    }
  };

  if (isAdLibShowing) {
    return <LibViewer lib={lib} questions={questions} />;
  }
  return isBuilderDone ? (
    <Card className="flex flex-col gap-5" useForSmall>
      <header className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold capitalize">{lib.prompt}...</h2>
        <div>{lib.isPG ? <BadgePG /> : <BadgeNSFW />}</div>
      </header>
      <form className="flex flex-col gap-5">
        {!isAdLibShowing &&
          questions.map((question, index) => {
            const error = errors[index];
            return (
              <div key={index} className="flex flex-col gap-3">
                <label htmlFor={question.question + index}>
                  {snakeToTitleCase(question.question)}
                </label>
                <FormInput
                  id={question.question + index}
                  type="text"
                  value={question.answer}
                  onChange={changeAnswer}
                  placeholder={snakeToTitleCase(question.question)}
                  border={error ? "border-red-400" : ""}
                  onBlur={removeErrorOnBlur}
                  dataIndex={`${index}`}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </div>
            );
          })}
        <div>
          <button
            className="py-3 px-3 hover:bg-zinc-900 w-fit active:bg-zinc-800 ease-out duration-200 border-r-rounded border rounded border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-800"
            type="button"
            onClick={createAdLib}
          >
            Generate Ad-Lib
          </button>
        </div>
      </form>
    </Card>
  ) : (
    <p data-testid="no-madlib-text">Ad Lib being created...</p>
  );
};

export default LibsBuilder;
