"use client";

import React, { useState } from "react";
import BrowseFeedHeader from "./browse-feed-header";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export default function BrowseFeed() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [timestamp] = useState<Date>(new Date());

  const { data, isLoading, error } = api.adlib.getPaginated.useQuery({
    page,
    size,
    timestamp: timestamp.toISOString(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data); // Should log your data once loaded.

  return (
    <Card>
      <CardHeader>
        <BrowseFeedHeader />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
