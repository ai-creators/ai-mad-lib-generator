import { useMemo, useState } from "react";
import Card from "../../../Card/Card";
import BadgeNSFW from "../../../Badge/BadgeNSFW/BadgeNSFW";
import { snakeToTitleCase } from "../../../utils/snakeToTitleCase";
import FormInput from "../../../Form/FormInput/FormInput";
import Lib from "../../../../api/Lib";
import { useNavigate } from "react-router-dom";
import ErrorAlertFixed from "../../../../errors/ErrorAlertFixed/ErrorAlertFixed";
import ApiErrorHandler from "../../../../errors/ApiErrorHandler";

const LibsBuilderV1 = ({ lib }) => {
  const [questions, setQuestions] = useState([]);
  const [isBuilderDone, setIsBuilderDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [fixedError, setFixedError] = useState(null);
  const navigate = useNavigate();

  useMemo(() => {
    setQuestions([]);
    const libText = lib?.text ?? "";
    const placeholders = libText.match(/\[(.*?)\]/g);
    if (placeholders) {
      placeholders.forEach((placeholder) => {
        const question = {
          question: placeholder.slice(1, -1),
          answer: "",
        };
        setQuestions((curr) => [...curr, question]);
      });
      setIsBuilderDone(true);
    }
  }, [lib?.text]);

  const changeAnswer = ({ target }) => {
    const index = parseInt(target.getAttribute("data-index"));
    const updatedAnswer = questions[index];
    updatedAnswer.answer = target.value;
    setQuestions((curr) => {
      return [...curr.slice(0, index), updatedAnswer, ...curr.slice(index + 1)];
    });
  };

  const createAdLib = async (event) => {
    event.preventDefault();
    const newErrors = {};
    questions.forEach((question, index) => {
      if (question.answer.trim() === "") {
        newErrors[index] = "Please provide an answer";
      }
    });
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await Lib.createResponse(lib._id, questions);
        if (response.data) {
          navigate(`/libs/view/${response.data._id}`);
        }
      } catch (error) {
        setFixedError(ApiErrorHandler.handleRequestResponse(error));
      }
    } else {
      setErrors(newErrors);
    }
  };

  const removeErrorOnBlur = ({ target }) => {
    const index = parseInt(target.getAttribute("data-index"));
    if (index === 0 || index) {
      if (errors[index] && questions[index].answer) {
        const errorsCopy = { ...errors };
        delete errorsCopy[index];
        setErrors(errorsCopy);
      }
    }
  };

  return isBuilderDone ? (
    <Card className="flex flex-col gap-5" useForSmall>
      <ErrorAlertFixed error={fixedError} />
      <header className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold capitalize" data-testid="prompt">
          {lib.prompt}...
        </h2>
        <div>{!lib.isPG && <BadgeNSFW />}</div>
      </header>
      <form className="flex flex-col gap-5">
        {questions.map((question, index) => {
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

export default LibsBuilderV1;
