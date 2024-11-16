"use client";

import React, { useState } from "react";
import { useAdlibsFeatured } from "../api/get-adlibs-featured-paginated";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";

const AdlibFeatured = () => {
  const [page] = useState<number>(1);
  const [size] = useState<number>(5);
  const [timestamp] = useState<Date>(new Date());
  const adlibsFeaturedQuery = useAdlibsFeatured({
    page,
    size,
    timestamp,
  });

  const queryClient = useQueryClient();

  if (adlibsFeaturedQuery.isLoading) {
    return (
      <Card>
        <p>Loading...</p>
      </Card>
    );
  }

  const adlibsPaginated = adlibsFeaturedQuery.data;

  return (
    <Card>
      <header className="p-5">
        <h3 className="text-2xl font-semibold">Featured Adlibs</h3>
        <p className="text-muted-foreground">
          View our featured adlibs generated by other users
        </p>
      </header>
    </Card>
  );
};

export default AdlibFeatured;
