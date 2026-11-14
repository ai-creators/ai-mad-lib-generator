import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReactionsConstants } from "~/app/_features/reactions/reactions-constants";

function reactionKey(adlibId: string, reactionType: string): string {
  return `${adlibId}:${reactionType}`;
}

interface ReactedAdlibsState {
  reactedIds: Record<string, string>;
  getReactionId: (adlibId: string, reactionType: string) => string | undefined;
  hasReacted: (adlibId: string, reactionType: string) => boolean;
  markReacted: (
    adlibId: string,
    reactionType: string,
    reactionId: string,
  ) => void;
  unmarkReacted: (adlibId: string, reactionType: string) => void;
}

export const useReactedAdlibsStore = create<ReactedAdlibsState>()(
  persist(
    (set, get) => ({
      reactedIds: {},
      getReactionId: (adlibId, reactionType) =>
        get().reactedIds[reactionKey(adlibId, reactionType)],
      hasReacted: (adlibId, reactionType) =>
        reactionKey(adlibId, reactionType) in get().reactedIds,
      markReacted: (adlibId, reactionType, reactionId) => {
        const key = reactionKey(adlibId, reactionType);
        set((state) => ({
          reactedIds: { ...state.reactedIds, [key]: reactionId },
        }));
      },
      unmarkReacted: (adlibId, reactionType) => {
        const key = reactionKey(adlibId, reactionType);
        set((state) => {
          if (!(key in state.reactedIds)) return state;
          const next = { ...state.reactedIds };
          delete next[key];
          return { reactedIds: next };
        });
      },
    }),
    { name: ReactionsConstants.REACTED_ADLIB_KEYS },
  ),
);

export function useReactedAdlibs() {
  const getReactionId = useReactedAdlibsStore((state) => state.getReactionId);
  const hasReacted = useReactedAdlibsStore((state) => state.hasReacted);
  const markReacted = useReactedAdlibsStore((state) => state.markReacted);
  const unmarkReacted = useReactedAdlibsStore((state) => state.unmarkReacted);

  return { getReactionId, hasReacted, markReacted, unmarkReacted };
}
