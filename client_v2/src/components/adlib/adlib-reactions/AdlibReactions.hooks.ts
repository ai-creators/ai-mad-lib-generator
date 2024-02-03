import React, { useEffect, useState } from "react";
import ReactionService from "../../../services/ReactionService";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactionTypeModel } from "../../../models/ReactionTypeModel";
import { ErrorModel } from "../../../models/ErrorModel";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ReactionModel } from "../../../models/ReactionModel";

export const useAdlibReactions = (adlibId?: string) => {
  const { account } = useAppSelector((state) => state.account);
  const { getAccessTokenSilently } = useAuth0();
  const [userReactions, setUserReactions] = useState<ReactionModel[]>([]);
  const [reactions, setReactions] = useState<
    {
      reactionType: ReactionTypeModel;
      count: number;
    }[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const getReactions = async () => {
    if (adlibId) {
      setIsLoading(true);
      const { data, error: apiError } =
        await ReactionService.getReactionsFromAdlib(adlibId, account?.id);

      if (data) {
        setReactions(data.adlibReactions);
        setUserReactions(data?.reactions ?? []);
      }

      if (apiError) {
        setError(apiError);
      }
      setIsLoading(false);
    }
  };

  const reactAdlib = async () => {
    console.log("REACTING");
    if (account?.id && adlibId) {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();
      const { data, error: apiError } = await ReactionService.likeAdlib(
        adlibId,
        account.id,
        accessToken
      );

      if (data) {
        setUserReactions(data.hasReacted ? [data] : []);
        getReactions();
      }

      if (apiError) {
        setError(apiError);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getReactions();
  }, [adlibId, getAccessTokenSilently]);

  return { userReactions, reactions, error, reactAdlib, isLoading };
};
