import { ErrorModel } from "@/models/ErrorModel";
import { ChangeEvent, FormEvent, useState } from "react";
import { AdlibConfig } from "../../adlibConfig";

export const useAdlibCreateCard = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [config, setConfig] = useState<AdlibConfig>({
    topP: 1,
    temperature: 0.7,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const changePrompt = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPrompt(value);
  };

  const changeConfig = (changeKey: keyof AdlibConfig, newValue: number) => {
    setConfig((curr) => ({ ...curr, [changeKey]: newValue }));
  };

  const generate = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    setIsLoading(false);
  };

  return {
    prompt,
    config,
    isLoading,
    error,
    changePrompt,
    changeConfig,
    generate,
  };
};
