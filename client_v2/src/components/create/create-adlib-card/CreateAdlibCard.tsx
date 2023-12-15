import { ChangeEvent, useState } from "react";
import Card from "../../card/Card";
import { ErrorModel } from "../../../models/ErrorModel";
import GeneratorService from "../../../services/GeneratorService";
import ErrorAlertFixed from "../../errors/error-alert-fixed/ErrorAlertFixed";
import { useAppSelector } from "../../../hooks/useAppSelector";

const CreateAdlibCard = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const { account } = useAppSelector((state) => state.account);

  const changePrompt = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPrompt(value);
  };

  const generate = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await GeneratorService.generateAdlib(
      prompt,
      account ? account.id : null
    );

    if (error) {
      setError(error);
    }
    console.log(data, error);
    setIsLoading(false);
  };
  return (
    <Card className="flex flex-col gap-5">
      {error && <ErrorAlertFixed error={error} setError={setError} />}
      <header>
        <h2 className="text-2xl font-semibold">Create an Adlib</h2>
        <p className="text-zinc-500">Enter a promp to generate an adlib</p>
      </header>
      <form>
        <div className="flex relative">
          <label className="sr-only">Enter a prompt for an adlib</label>
          <input
            className="border border-zinc-300 p-3 rounded w-full focus:outline outline-2 outline-offset-2"
            placeholder="The Rock fighting paper"
            value={prompt}
            onChange={changePrompt}
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 border rounded-r border-zinc-300 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-black bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-white"
            onClick={generate}
            disabled={!prompt.length || isLoading}
          >
            {isLoading ? "Loading..." : "Generate"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default CreateAdlibCard;
