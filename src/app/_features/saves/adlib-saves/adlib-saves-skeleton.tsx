import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function AdlibSavesSkeleton() {
  return (
    <ul className="flex flex-col gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}>
          <Card>
            <CardHeader className="gap-2">
              <Skeleton className="h-5 w-[220px]" />
              <Skeleton className="h-4 w-[160px]" />
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-8" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
