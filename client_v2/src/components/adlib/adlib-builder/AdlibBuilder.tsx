import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { AdlibModel } from "../../../models/AdlibModel";
import { useNavigate } from "react-router-dom";
import Card from "../../card/Card";
import ButtonPrimary from "../../button/button-primary/ButtonPrimary";
import AdlibResponseService from "../../../services/AdlibResponseService";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { AdlibResponseQuestionModel } from "../../../models/AdlibResponseQuestionModel";
import { ErrorModel } from "../../../models/ErrorModel";
import ErrorAlertFixed from "../../errors/error-alert-fixed/ErrorAlertFixed";

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

  const { account } = useAppSelector((state) => state.account);
  const navigate = useNavigate();

  useMemo(() => {
    setQuestions([]);
    const adlibText = adlib.body;
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
    const { data, error } = await AdlibResponseService.createAdlibResponse(
      adlib.id,
      questions,
      account?.id || null
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
    <Card className="flex flex-col gap-5">
      {apiError ? (
        <ErrorAlertFixed error={apiError} setError={setApiError} />
      ) : null}
      <header className="flex flex-col">
        <h2 className="text-xl font-semibold capitalize">{adlib.title}</h2>
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
                {question.question}
              </label>
              <input
                id={question.question + index}
                type="text"
                value={question.answer}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  changeAnswer(index, event);
                }}
                placeholder={question.question}
                onBlur={() => removeErrorOnBlur(index)}
                className={`${
                  error ? "border-red-400" : "border-zinc-300"
                } border rounded p-3`}
              />
            </div>
          );
        })}
        <div>
          <ButtonPrimary disabled={isLoading}>
            {isLoading ? "Loading..." : "Generate Adlib"}
          </ButtonPrimary>
        </div>
      </form>
    </Card>
  ) : (
    <p>Adlib being created...</p>
  );
};

export default AdlibBuilder;
