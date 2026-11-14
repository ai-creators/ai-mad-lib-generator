"use client";

import { useForm } from "@tanstack/react-form";
import { Search } from "lucide-react";
import React from "react";
import { z } from "zod";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";

export const searchSchema = z.object({
  search: z.string(),
});

type BrowseSearchFormProps = {
  placeholder?: string;
  onSubmit: (values: z.infer<typeof searchSchema>) => void;
};

export default function BrowseSearchForm({
  placeholder = "search adlibs...",
  onSubmit,
}: BrowseSearchFormProps) {
  const form = useForm({
    defaultValues: {
      search: "",
    },
    validators: {
      onSubmit: searchSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field name="search">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Search</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={placeholder}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton type="submit" size="icon-xs">
                    <Search />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </form>
  );
}
