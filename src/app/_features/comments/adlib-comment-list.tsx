import React from "react";
import { api } from "~/trpc/server";
import AdlibCommentCard from "./adlib-comment-card";

type Props = {
  adlibId: string;
};

export default async function AdlibCommentList({ adlibId }: Props) {
  const comments = await api.comments.getByAdlibId({ adlibId });

  if (comments.length === 0) {
    return <div className="text-sm text-muted-foreground">No comments yet</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <AdlibCommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
