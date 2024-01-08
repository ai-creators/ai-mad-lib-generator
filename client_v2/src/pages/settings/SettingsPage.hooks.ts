import { useState } from "react";
import { ContentRating } from "../../models/ContentRating";

export const useSettingsPage = () => {
  const [contentRating, setContentRating] = useState<ContentRating>(
    ContentRating.PG
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
