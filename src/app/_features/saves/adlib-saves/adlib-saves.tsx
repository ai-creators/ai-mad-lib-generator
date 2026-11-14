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
import AdlibSavesSkeleton from "./adlib-saves-skeleton";
import { api } from "~/trpc/react";
import { useSavedAdlibs } from "~/hooks/use-saved-adlibs";

export default function AdlibSaves() {
  const { savedIds } = useSavedAdlibs();
  const {
    data: savedAdlibs,
    isLoading,
    error,
  } = api.adlib.getSaves.useQuery({
    adlibs: savedIds,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Adlibs</CardTitle>
        <CardDescription>View your saved adlib prompts</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-destructive">
            Error loading saved adlibs: {error.message}
          </p>
        ) : isLoading ? (
          <AdlibSavesSkeleton />
        ) : !savedAdlibs || savedAdlibs.length === 0 ? (
          <p className="text-muted-foreground">No adlibs saved yet.</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {savedAdlibs.map((adlib) => (
              <li key={adlib.id}>
                <AdlibSavesCard adlib={adlib} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
