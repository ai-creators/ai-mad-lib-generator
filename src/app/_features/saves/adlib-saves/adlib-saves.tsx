"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import AdlibSavesCard from "./adlib-saves-card";
import { api } from "~/trpc/react";

export default function AdlibSaves() {
  const {
    data: savedAdlibs,
    isLoading,
    error,
  } = api.adlib.getSaves.useQuery({
    adlibs: getItem(SavesConstants.SAVED_ADLIB_IDS),
  });

  if (isLoading) {
    return <div>Loading saved adlibs...</div>;
  }

  if (error) {
    return <div>Error loading saved adlibs: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Adlibs</CardTitle>
        <CardDescription>View your saved adlib prompts</CardDescription>
      </CardHeader>
      <CardContent>
        {!savedAdlibs || savedAdlibs.length === 0
          ? "No Adlibs available"
          : savedAdlibs.map((adlib) => (
              <AdlibSavesCard key={adlib.id} adlib={adlib} />
            ))}
      </CardContent>
    </Card>
  );
}
