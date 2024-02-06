import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorModel } from "../../../models/ErrorModel";
import { useNavigate } from "react-router-dom";
import GeneratorService from "../../../services/GeneratorService";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { AdlibLengths } from "../AdlibLengths";

export const useAdlibCreate = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(1);
  const [length, setLength] = useState<AdlibLengths>(AdlibLengths.SHORT);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const navigate = useNavigate();
  const { account } = useAppSelector((state) => state.account);

  const changePrompt = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPrompt(value);
  };

  const changeLength = (length: AdlibLengths) => {
    setLength(length);
  };

  const changeTemperature = (event: ChangeEvent<HTMLInputElement>) => {
    setTemperature(+event.target.value);
  };

  const changeTopP = (event: ChangeEvent<HTMLInputElement>) => {
    setTopP(+event.target.value);
  };

  const generate = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const { data, error } = await GeneratorService.generateAdlib(
      prompt,
      account ? account.id : null,
      temperature,
      topP
    );

    if (data) {
      navigate(`/adlib/play/${data.id}`);
    }

    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return {
    prompt,
    changePrompt,
    error,
    isLoading,
    generate,
    temperature,
    changeTemperature,
    topP,
    changeTopP,
    length,
    changeLength,
  };
};
