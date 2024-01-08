import { useState } from "react";
import { ContentRating } from "../../models/ContentRating";
import { useAppSelector } from "../../hooks/useAppSelector";
import storage from "../../utils/Storage";
import AccountService from "../../services/AccountService";
import { useAuth0 } from "@auth0/auth0-react";
import { ErrorModel } from "../../models/ErrorModel";

export const useSettingsPage = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const { account } = useAppSelector((state) => state.account);

  const getInitialContentRating = (): ContentRating => {
    if (account?.id) {
      if (account.usePg === false) {
        return ContentRating.NSFW;
      }
    } else {
      const isPg: boolean = storage.get("isPg");
      if (isPg === false) {
        return ContentRating.NSFW;
      }
    }
    return ContentRating.PG;
  };

  const [contentRating, setContentRating] = useState<ContentRating>(
    getInitialContentRating()
  );
  const [isRatingConfirmationOpen, setIsRatingConfirmationOpen] =
    useState<boolean>(false);

  const [error, setError] = useState<ErrorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const closeRatingConfirmationModal = () => {
    setIsRatingConfirmationOpen(false);
  };

  const changeContentRatingWithAccount = async (rating: ContentRating) => {
    setIsLoading(true);
    if (!user?.sub || !account?.id) {
      setError({ message: "Account not found." });
      return;
    }
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await AccountService.updateContentRating(
      rating,
      user.sub,
      account.id,
      accessToken
    );
    if (data) {
      const { usePg } = data;
      storage.set("isPg", usePg);
      setContentRating(usePg ? ContentRating.PG : ContentRating.NSFW);
    }
    if (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const changeContentRating = (rating: ContentRating) => {
    if (rating === ContentRating.NSFW) {
      if (account?.id) {
        changeContentRatingWithAccount(rating);
        return;
      }
      setIsRatingConfirmationOpen(true);
      return;
    }
    if (account?.id) {
      changeContentRatingWithAccount(rating);
      return;
    }
    setContentRating(rating);
  };

  return {
    contentRating,
    error,
    isLoading,
    setContentRating,
    changeContentRating,
    isRatingConfirmationOpen,
    closeRatingConfirmationModal,
    changeContentRatingWithAccount,
  };
};
