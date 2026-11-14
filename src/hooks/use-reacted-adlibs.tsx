import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReactionsConstants } from "~/app/_features/reactions/reactions-constants";

function reactionKey(adlibId: string, reactionType: string): string {
  return `${adlibId}:${reactionType}`;
}

interface ReactedAdlibsState {
  reactedKeys: string[];
  hasReacted: (adlibId: string, reactionType: string) => boolean;
  markReacted: (adlibId: string, reactionType: string) => void;
}

export const useReactedAdlibsStore = create<ReactedAdlibsState>()(
  persist(
    (set, get) => ({
      reactedKeys: [],
      hasReacted: (adlibId, reactionType) =>
        get().reactedKeys.includes(reactionKey(adlibId, reactionType)),
      markReacted: (adlibId, reactionType) => {
        const key = reactionKey(adlibId, reactionType);
        set((state) =>
          state.reactedKeys.includes(key)
            ? state
            : { reactedKeys: [...state.reactedKeys, key] },
        );
      },
    }),
    { name: ReactionsConstants.REACTED_ADLIB_KEYS },
  ),
);

export function useReactedAdlibs() {
  const hasReacted = useReactedAdlibsStore((state) => state.hasReacted);
  const markReacted = useReactedAdlibsStore((state) => state.markReacted);

  return { hasReacted, markReacted };
}
