"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import AdlibSavesCard from "./adlib-saves-card";
import { api } from "~/trpc/react";
import { getItem } from "~/hooks/use-storage";
import { SavesConstants } from "../saves-constants";

export default function AdlibSaves() {
  const [savedAdlibIds, setSavedAdlibIds] = useState<string[] | null>(null);

  useEffect(() => {
    const raw = getItem(SavesConstants.SAVED_ADLIB_IDS);
    const ids = raw?.split(",").filter((id) => id.trim() !== "") ?? [];
    setSavedAdlibIds(ids);
  }, []);

  const {
    data: savedAdlibs,
    isLoading,
    error,
  } = api.adlib.getSaves.useQuery(
    { adlibs: savedAdlibIds ?? [] },
    {
      enabled: !!savedAdlibIds,
    }
  );

  if (!savedAdlibIds) {
    return <div>Loading saved adlibs...</div>;
  }

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