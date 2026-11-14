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
import { useFeatureToggle } from "../../feature-toggle/feature-toggle.context";
import { FeatureToggles } from "../../feature-toggle/feature-toggles";
import type { CreateAdlibFormApi } from "../create-adlib-form";

type Props = {
  form: CreateAdlibFormApi;
  disabled?: boolean;
};

export default function CreateAdlibTone({ form, disabled }: Props) {
  const { data: tones, isPending } = api.tone.getAll.useQuery();
  const { isFeatureEnabled } = useFeatureToggle();

  if (!isFeatureEnabled(FeatureToggles.TONE)) {
    return null;
  }

  return (
    <form.Field name="toneId">
      {(field) => (
        <Select
          disabled={Boolean(disabled) || isPending || !tones?.length}
          name={field.name}
          value={field.state.value}
          onValueChange={field.handleChange}
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
      )}
    </form.Field>
  );
}
