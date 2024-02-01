import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { AdlibModel } from "../../../models/AdlibModel";
import { Link, useNavigate } from "react-router-dom";
import { adlibResponseService } from "../../../services/AdlibResponseService";
import { AdlibResponseQuestionModel } from "../../../models/AdlibResponseQuestionModel";
import { ErrorModel } from "../../../models/ErrorModel";
import { formatSnakeCase } from "../../../utils/formatSnakeCase";
import { Card } from "@/components/ui/card";
import ErrorAlertFixed from "@/errors/error-alert-fixed/ErrorAlertFixed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  adlib: AdlibModel;
};

const AdlibBuilder = ({ adlib }: Props) => {
  const [questions, setQuestions] = useState<AdlibResponseQuestionModel[]>([]);
  const [isBuilderDone, setIsBuilderDone] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});

  const [apiError, setApiError] = useState<ErrorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useMemo(() => {
    setQuestions([]);
    const adlibText = adlib.text;
    const placeHolders = adlibText.match(/\[(.*?)\]/g);
    if (placeHolders) {
      placeHolders.forEach((placeHolder) => {
        const question = {
          question: placeHolder.slice(1, -1),
          answer: "",
        };
        setQuestions((curr) => [...curr, question]);
      });
    }
    setIsBuilderDone(true);
  }, [adlib.body]);

  const changeAnswer = (
    questionIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedAnswer = questions[questionIndex];
    updatedAnswer.answer = event.target.value;
    setQuestions((curr) => {
      return [
        ...curr.slice(0, questionIndex),
        updatedAnswer,
        ...curr.slice(questionIndex + 1),
      ];
    });
  };

  const removeErrorOnBlur = (questionIndex: number) => {
    if (errors[questionIndex] && questions[questionIndex].answer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorsCopy: any = { ...errors };
      delete errorsCopy[questionIndex];
      setErrors(errorsCopy);
    }
  };

  const generateAdlibResponse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null);
    setIsLoading(true);
    const [data, error] = await adlibResponseService.createResponse(
      adlib.id,
      questions
    );
    if (data) {
      navigate(`/adlib/view/${data.id}`);
    }
    if (error) {
      setApiError(error);
    }
    setIsLoading(false);
  };

  return isBuilderDone ? (
    <Card className="flex flex-col gap-5 p-5">
      {apiError ? (
        <ErrorAlertFixed error={apiError} setError={setApiError} />
      ) : null}
      <header className="flex flex-col">
        <h2 className="text-xl font-semibold capitalize">
          <Link
            to={`/adlib/${adlib.id}`}
            className="hover:underline underline-offset-2"
          >
            {adlib.title}
          </Link>
        </h2>
        <p className="text-zinc-500">{adlib.prompt}...</p>
      </header>
      <form className="flex flex-col gap-5" onSubmit={generateAdlibResponse}>
        {questions.map((question, index) => {
          const error = errors[index];
          return (
            <div
              key={`${question.question} ${index}`}
              className="flex flex-col gap-3"
            >
              <label htmlFor={question.question + index}>
                {formatSnakeCase(question.question)}
              </label>
              <Input
                id={question.question + index}
                type="text"
                value={question.answer}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  changeAnswer(index, event);
                }}
                onBlur={() => removeErrorOnBlur(index)}
                className={`${
                  error ? "border-red-400 dark:border-red-400" : ""
                }`}
              />
            </div>
          );
        })}
        <div>
          <Button disabled={isLoading}>
            {isLoading ? "Loading..." : "Generate Adlib"}
          </Button>
        </div>
      </form>
    </Card>
  ) : (
    <p>Adlib being created...</p>
  );
};

export default AdlibBuilder;
