import React from "react";
import Adlib from "~/app/_features/adlib/adlib";

interface AdlibPageParams {
  params: Promise<{
    adlibId: string;
  }>;
}

export default async function AdlibPage({ params }: AdlibPageParams) {
  const { adlibId } = await params;

  if (!adlibId) {
    return <div>Adlib ID is missing</div>;
  }

  return <Adlib adlibId={adlibId} />;
}
