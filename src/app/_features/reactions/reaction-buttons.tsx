'use client';

import { useState, useEffect } from 'react';

import { toast } from 'sonner';
import { getReaction, toggleReaction } from '~/app/_features/reactions/reactions.storage';
import { api } from '~/trpc/react';

type ReactionType = 'like' | 'dislike';

type Props = {
  contentId: string;
};

export default function ReactionButtons({ contentId }: Props) {
  const [reaction, setReaction] = useState<ReactionType | null>(null);

  const { data: counts, refetch } = api.reactions.counts.useQuery({ contentId });

  const setReactionMutation = api.reactions.set.useMutation({
    onSuccess: () => refetch(),
    onError: () => toast.error('Failed to react'),
  });

  const removeReactionMutation = api.reactions.remove.useMutation({
    onSuccess: () => refetch(),
    onError: () => toast.error('Failed to remove reaction'),
  });

  useEffect(() => {
    const stored = getReaction(contentId);
    if (stored) setReaction(stored);
  }, [contentId]);

  const handleClick = (newReaction: ReactionType) => {
    const updated = toggleReaction(contentId, newReaction);
    setReaction(updated);

    if (updated === null) {
      removeReactionMutation.mutate({ contentId });
    } else {
      setReactionMutation.mutate({ contentId, reaction: newReaction });
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={() => handleClick('like')}
        className={`px-3 py-1 rounded ${
          reaction === 'like' ? 'bg-green-500 text-white' : 'bg-gray-200'
        }`}
      >
        👍 {counts?.likeCount ?? 0}
      </button>
      <button
        onClick={() => handleClick('dislike')}
        className={`px-3 py-1 rounded ${
          reaction === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-200'
        }`}
      >
    
        👎 {counts?.dislikeCount ?? 0}
      </button>
    </div>
  );
}
