import React from "react";
import AdlibPlayResults from "~/app/_features/adlib/play/results/adlib-play-results";
import { HydrateClient } from "~/trpc/server";

interface AdlibPlayResultsProps {
  params: Promise<{
    adlibId: string;
    resultId: string;
  }>;
}

export default async function AdlibPlayPage({ params }: AdlibPlayResultsProps) {
  const { resultId } = await params;

  if (!resultId) {
    return <div>Adlib ID is missing</div>;
  }

  return (
    <HydrateClient>
      <AdlibPlayResults resultId={resultId} />
    </HydrateClient>
  );
}
