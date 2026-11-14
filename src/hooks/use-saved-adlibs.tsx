import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SavesConstants } from "~/app/_features/saves/saves-constants";

interface SavedAdlibsState {
  savedIds: string[];
  isSaved: (adlibId: string) => boolean;
  toggleSaved: (adlibId: string) => void;
}

export const useSavedAdlibsStore = create<SavedAdlibsState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      isSaved: (adlibId) => get().savedIds.includes(adlibId),
      toggleSaved: (adlibId) => {
        set((state) => ({
          savedIds: state.savedIds.includes(adlibId)
            ? state.savedIds.filter((id) => id !== adlibId)
            : [...state.savedIds, adlibId],
        }));
      },
    }),
    { name: SavesConstants.SAVED_ADLIB_IDS },
  ),
);

export function useSavedAdlibs() {
  const savedIds = useSavedAdlibsStore((state) => state.savedIds);
  const isSaved = useSavedAdlibsStore((state) => state.isSaved);
  const toggleSaved = useSavedAdlibsStore((state) => state.toggleSaved);

  return { savedIds, isSaved, toggleSaved };
}
