"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import AdlibSavesCard from "../adlib-saves/adlib-saves-card";

export default function ResultsSaves() {
  // Use tRPC to query the getResults API endpoint
  const {
    data: adlibResults,
    isLoading,
    error,
  } = api.adlib.getResults.useQuery();

  if (isLoading) {
    return <div>Loading saved adlib responses...</div>;
  }

  if (error) {
    return <div>Error loading saved adlib responses: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Adlib Responses</CardTitle>
        <CardDescription>View your saved adlib responses</CardDescription>
      </CardHeader>
      <CardContent>
        {!adlibResults || adlibResults.length === 0
          ? "No Adlib Responses available"
          : adlibResults.map((result) => (
              // Wrap each id string in an object with an `id` property before passing to the card
              <AdlibSavesCard key={result} adlib={{ id: result }} />
            ))}
      </CardContent>
    </Card>
  );
}
