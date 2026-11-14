"use client";

import { Heart, Laugh, PartyPopper, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useReactedAdlibs } from "~/hooks/use-reacted-adlibs";
import { ReactionType } from "~/types/reactions";

interface AdlibReactionsProps {
  adlibId: string;
}

const REACTIONS: {
  type: ReactionType;
  icon: typeof Laugh;
  label: string;
}[] = [
  { type: ReactionType.LAUGH, icon: Laugh, label: "Laugh" },
  { type: ReactionType.LOVE, icon: Heart, label: "Love" },
  { type: ReactionType.WOW, icon: Sparkles, label: "Wow" },
  { type: ReactionType.CLAP, icon: PartyPopper, label: "Clap" },
];

export default function AdlibReactions({ adlibId }: AdlibReactionsProps) {
  const utils = api.useUtils();
  const { getReactionId, hasReacted, markReacted, unmarkReacted } =
    useReactedAdlibs();

  const { data: counts } = api.reactions.getCounts.useQuery({ adlibId });
  const createReaction = api.reactions.create.useMutation({
    onSettled: async () => {
      await utils.reactions.getCounts.invalidate({ adlibId });
    },
  });
  const deleteReaction = api.reactions.delete.useMutation({
    onSettled: async () => {
      await utils.reactions.getCounts.invalidate({ adlibId });
    },
  });

  const countFor = (type: ReactionType) =>
    counts?.find((c) => c.reactionType === (type as string))?.count ?? 0;

  const handleReact = (type: ReactionType) => {
    const existingId = getReactionId(adlibId, type);
    if (existingId) {
      unmarkReacted(adlibId, type);
      deleteReaction.mutate({ id: existingId });
      return;
    }

    markReacted(adlibId, type, "pending");
    createReaction.mutate(
      { adlibId, reactionType: type },
      {
        onSuccess: (reactionId) => {
          if (reactionId) markReacted(adlibId, type, reactionId);
        },
        onError: () => unmarkReacted(adlibId, type),
      },
    );
  };

  return (
    <div className="flex items-center gap-2">
      {REACTIONS.map(({ type, icon: Icon, label }) => {
        const reacted = hasReacted(adlibId, type);
        return (
          <Button
            key={type}
            type="button"
            variant="outline"
            size="sm"
            disabled={createReaction.isPending || deleteReaction.isPending}
            aria-label={
              reacted ? `Remove ${label.toLowerCase()} reaction` : label
            }
            aria-pressed={reacted}
            data-cy={`reaction-btn-${type}`}
            onClick={() => handleReact(type)}
            className={cn("gap-1.5", reacted && "border-primary text-primary")}
          >
            <Icon className="h-4 w-4" />
            {countFor(type)}
          </Button>
        );
      })}
    </div>
  );
}
