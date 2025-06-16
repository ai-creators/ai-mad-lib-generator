// components/ReactionButtons.tsx
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/utils/api'; // <-- tRPC hook (t3 stack)
import { toast } from 'sonner'; // nice toast feedback

type Props = {
  contentId: string;
};

export default function ReactionButtons({ contentId }: Props) {
  const localKey = `reaction_${contentId}`;
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);

  const utils = api.useUtils();
  const setReactionMutation = api.reactions.set.useMutation({
    onSuccess: () => utils.reactions.invalidate(),
    onError: () => toast.error('Failed to set reaction'),
  });
  const removeReactionMutation = api.reactions.remove.useMutation({
    onSuccess: () => utils.reactions.invalidate(),
    onError: () => toast.error('Failed to remove reaction'),
  });

  useEffect(() => {
    const stored = localStorage.getItem(localKey);
    if (stored === 'like' || stored === 'dislike') {
      setReaction(stored);
    }
  }, [localKey]);

  const handleClick = (newReaction: 'like' | 'dislike') => {
    if (reaction === newReaction) {
      localStorage.removeItem(localKey);
      setReaction(null);
      removeReactionMutation.mutate({ contentId });
    } else {
      localStorage.setItem(localKey, newReaction);
      setReaction(newReaction);
      setReactionMutation.mutate({ contentId, reaction: newReaction });
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className={reaction === 'like' ? 'text-green-500' : ''}
        onClick={() => handleClick('like')}
      >
        👍 Like
      </button>
      <button
        className={reaction === 'dislike' ? 'text-red-500' : ''}
        onClick={() => handleClick('dislike')}
      >
        👎 Dislike
      </button>
    </div>
  );
}
