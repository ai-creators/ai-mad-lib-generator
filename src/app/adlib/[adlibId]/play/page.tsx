import React from "react";
import AdlibPlay from "~/app/_features/adlib/play/adlib-play";
import { HydrateClient } from "~/trpc/server";

interface AdlibPlayPageParams {
  params: Promise<{
    adlibId: string;
  }>;
}

export default async function AdlibPlayPage({ params }: AdlibPlayPageParams) {
  const { adlibId } = await params;

  if (!adlibId) {
    return <div>Adlib ID is missing</div>;
  }

  return (
    <HydrateClient>
      <AdlibPlay adlibId={adlibId} />
    </HydrateClient>
  );
}
