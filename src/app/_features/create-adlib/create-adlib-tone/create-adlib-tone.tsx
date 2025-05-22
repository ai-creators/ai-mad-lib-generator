"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

export default function CreateAdlibTone() {
  const { data: tones, isPending } = api.tone.getAll.useQuery();

  return (
    <Select disabled={isPending || !tones?.length}>
      <SelectTrigger className="h-10 w-48">
        <SelectValue placeholder="Select adlib tone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Tones</SelectLabel>
          {tones?.map((tone) => (
            <SelectItem key={tone.id} value={tone.id}>
              {tone.style}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
