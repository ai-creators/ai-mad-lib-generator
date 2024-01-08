import { useState } from "react";
import { ContentRating } from "../../models/ContentRating";
import { useAppSelector } from "../../hooks/useAppSelector";
import storage from "../../utils/Storage";

export const useSettingsPage = () => {
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

  const closeRatingConfirmationModal = () => {
    setIsRatingConfirmationOpen(false);
  };

  const changeContentRating = (rating: ContentRating) => {
    if (rating === ContentRating.NSFW) {
      setIsRatingConfirmationOpen(true);
    } else {
      setContentRating(rating);
    }
  };

  return {
    contentRating,
    setContentRating,
    changeContentRating,
    isRatingConfirmationOpen,
    closeRatingConfirmationModal,
  };
};
