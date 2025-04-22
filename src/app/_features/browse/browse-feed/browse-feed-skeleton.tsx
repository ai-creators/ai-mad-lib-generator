import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function BrowseFeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="order-2 space-y-2 sm:order-1">
              <Skeleton className="h-5 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="order-1 h-4 w-[100px] sm:order-2" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-[60px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[70px]" />
            </div>
            <Skeleton className="mt-3 h-9 w-28" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
