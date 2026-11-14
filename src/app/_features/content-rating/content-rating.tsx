import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ContentRating {
  PG = "PG",
  NSFW = "NSFW",
}

interface ContentRatingState {
  contentRating: ContentRating;
  updateContentRating: (rating: ContentRating) => void;
}

export const useContentRatingStore = create<ContentRatingState>()(
  persist(
    (set) => ({
      contentRating: ContentRating.PG,
      updateContentRating: (rating) => set({ contentRating: rating }),
    }),
    { name: "contentRating" },
  ),
);

export function useContentRating() {
  const contentRating = useContentRatingStore((state) => state.contentRating);
  const updateContentRating = useContentRatingStore(
    (state) => state.updateContentRating,
  );

  return { contentRating, updateContentRating };
}
