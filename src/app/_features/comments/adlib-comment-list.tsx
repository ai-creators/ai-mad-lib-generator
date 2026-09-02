"use client";

import React from "react";
import { api } from "~/trpc/react";
import AdlibCommentCard from "./adlib-comment-card";

type Props = {
  adlibId: string;
};

export default function AdlibCommentList({ adlibId }: Props) {
  const {
    data: comments,
    isLoading,
    error,
  } = api.comments.getByAdlibId.useQuery({ adlibId });

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error loading comments: {error.message}</div>;
  }

  if (!comments || comments.length === 0) {
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
