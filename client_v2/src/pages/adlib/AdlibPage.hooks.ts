import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ErrorModel } from "../../models/ErrorModel";
import { useQuery } from "@tanstack/react-query";
import AdlibService from "../../services/AdlibService";
import ReactionService from "../../services/ReactionService";

export const useAdlibPage = () => {
  const { adlibId } = useParams();
  const { account } = useAppSelector((state) => state.account);
  const [hasBookmarked, setHasBookmarked] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  const fetchAdlib = async () => {
    if (!adlibId) {
      throw new Error("No adlib id has been provided");
    }
    const { data, error } = await AdlibService.findAdlibById(adlibId);
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      return data;
    }
  };

  const { data: adlib, isLoading } = useQuery({
    queryKey: ["adlib"],
    queryFn: fetchAdlib,
  });

  const bookmarkAdlib = async () => {
    if (adlib?.id) {
      const { data, error: apiError } = await ReactionService.bookmarkAdlib(
        adlib.id,
        account?.id
      );
      if (data) {
        setHasBookmarked(data.hasBookmarked);
      }
      console.log(apiError);
      if (apiError) {
        setError(apiError);
      }
    }
  };

  return { adlib, isLoading, hasBookmarked, error, bookmarkAdlib };
};
