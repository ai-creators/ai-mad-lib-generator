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
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useFeatureToggle } from "../../feature-toggle/feature-toggle.context";
import { FeatureToggles } from "../../feature-toggle/feature-toggles";

export default function CreateAdlibTone() {
  const form = useFormContext();
  const { data: tones, isPending } = api.tone.getAll.useQuery();
  const { isFeatureEnabled } = useFeatureToggle();

  if (!isFeatureEnabled(FeatureToggles.TONE)) {
    return null;
  }

  return (
    <FormField
      control={form.control}
      name="toneId"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              disabled={isPending || !tones?.length}
              onValueChange={field.onChange}
              value={field.value as string}
            >
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
          </FormControl>
        </FormItem>
      )}
    />
  );
}
