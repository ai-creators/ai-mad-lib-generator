"use client";

import React from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  useContentRating,
  ContentRating,
} from "../../content-rating/content-rating";

export default function SettingsContentRating() {
  const { contentRating, updateContentRating } = useContentRating();

  const handleRatingChange = (value: string) => {
    updateContentRating(value as ContentRating);
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 py-5">
        <Label>Content Rating</Label>
        <Tabs
          value={contentRating}
          onValueChange={handleRatingChange}
          className="w-[10rem]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={ContentRating.PG}>PG</TabsTrigger>
            <TabsTrigger value={ContentRating.NSFW}>NSFW</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}
