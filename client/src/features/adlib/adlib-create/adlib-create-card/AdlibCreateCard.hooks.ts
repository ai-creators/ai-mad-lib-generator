import { ErrorModel } from "@/models/ErrorModel";
import { ChangeEvent, FormEvent, useState } from "react";
import { AdlibConfig } from "../../adlibConfig";
import GeneratorService from "@/services/GeneratorService";
import { useNavigate } from "react-router-dom";

export const useAdlibCreateCard = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [config, setConfig] = useState<AdlibConfig>({
    topP: 1,
    temperature: 0.7,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const navigate = useNavigate();

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

    const [data, apiError] = await GeneratorService.generateAdlib(
      prompt,
      config.temperature,
      config.topP
    );

    if (data) {
      navigate(`/adlib/${encodeURIComponent(data.id)}/play`);
    }

    if (apiError) {
      setError(apiError);
    }
    setIsLoading(false);
  };

  const generateRandom = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const [data, apiError] = await GeneratorService.generateRandomAdlib(
      config.temperature,
      config.topP
    );

    if (data) {
      navigate(`/adlib/${encodeURIComponent(data.id)}/play`);
    }

    if (apiError) {
      setError(apiError);
    }
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
    generateRandom,
  };
};
