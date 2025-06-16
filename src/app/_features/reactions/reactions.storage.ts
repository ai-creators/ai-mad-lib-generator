// /src/app/_features/reactions/reactions.storage.ts

type ReactionType = 'like' | 'dislike';

const STORAGE_PREFIX = 'reaction_';

export function getReaction(contentId: string): ReactionType | null {
  const stored = localStorage.getItem(STORAGE_PREFIX + contentId);
  if (stored === 'like' || stored === 'dislike') {
    return stored;
  }
  return null;
}

export function setReaction(contentId: string, reaction: ReactionType) {
  localStorage.setItem(STORAGE_PREFIX + contentId, reaction);
}

export function removeReaction(contentId: string) {
  localStorage.removeItem(STORAGE_PREFIX + contentId);
}

export function toggleReaction(contentId: string, newReaction: ReactionType): ReactionType | null {
  const current = getReaction(contentId);
  if (current === newReaction) {
    removeReaction(contentId);
    return null;
  } else {
    setReaction(contentId, newReaction);
    return newReaction;
  }
}
