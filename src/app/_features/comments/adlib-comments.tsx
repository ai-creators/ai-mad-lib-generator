"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import AdlibCommentForm from "./adlib-comment-form";
import AdlibCommentList from "./adlib-comment-list";

type Props = {
  adlibId: string;
};

export default function AdlibComments({ adlibId }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <AdlibCommentForm adlibId={adlibId} />
        <AdlibCommentList adlibId={adlibId} />
      </CardContent>
    </Card>
  );
}
