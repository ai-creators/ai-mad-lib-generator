import { type inferProcedureOutput } from "@trpc/server";
import React from "react";
import { formatDateToMinutes } from "~/app/_utils/format-date";
import { type AppRouter } from "~/server/api/root";

type Comment = inferProcedureOutput<
  AppRouter["comments"]["getByAdlibId"]
>[number];

type Props = {
  comment: Comment;
};

export default function AdlibCommentCard({ comment }: Props) {
  return (
    <div className="border-b pb-3 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {comment.authorName ?? "Anonymous"}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDateToMinutes(comment.createdAt)}
        </span>
      </div>
      <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
        {comment.body}
      </p>
    </div>
  );
}
