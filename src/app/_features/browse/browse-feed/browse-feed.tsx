"use client";

import React from "react";
import BrowseFeedHeader from "./browse-feed-header";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function BrowseFeed() {
  return (
    <Card>
      <CardHeader>
        <BrowseFeedHeader />
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
