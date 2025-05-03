"use client";

import { type inferProcedureOutput } from "@trpc/server";
import { useState } from "react";
import { type AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";

// type Brands = inferProcedureOutput<
//   AppRouter["aiModels"]["getModels"]
// >;

export default function ModelsSelect() {
    const { data: brands, isLoading, isError, error } =
      api.aiModels.getModels.useQuery();
    const [selectedModelId, setSelectedModelId] = useState<string | undefined>(
      undefined
    );
  
    if (isLoading) return <div>Loading models…</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (!brands || brands.length === 0)
      return <div>No models available right now.</div>;
  
    return (
      <Select
        value={selectedModelId}
        onValueChange={(val) => setSelectedModelId(val)}
      >
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectGroup key={brand.id}>
              <SelectLabel>{brand.name}</SelectLabel>
              {brand.models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    );
  }
  