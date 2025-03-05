"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

const LOCAL_STORAGE_KEY = "contentRating";

export default function SettingsContentRating() {
  const [rating, setRating] = useState<string>("pg");

  useEffect(() => {
    const storedRating = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedRating) {
      setRating(storedRating);
    }
  }, []);

  const handleRatingChange = (value: string) => {
    setRating(value);
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 py-5">
        <Label>Content Rating</Label>
        <Tabs
          value={rating}
          onValueChange={handleRatingChange}
          className="w-[10rem]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pg">PG</TabsTrigger>
            <TabsTrigger value="nsfw">NSFW</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}
