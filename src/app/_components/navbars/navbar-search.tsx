"use client";

import { useForm } from "@tanstack/react-form";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { routerConfig } from "~/app/router-config";
import { Field, FieldError } from "~/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";

const searchSchema = z.object({
  search: z.string(),
});

export default function BrowseSearchForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      search: "",
    },
    validators: {
      onSubmit: searchSchema,
    },
    onSubmit: ({ value }) => {
      router.push(routerConfig.browse.execute(value));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.Field name="search">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <InputGroup className="bg-background">
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Search adlibs..."
                  data-cy="search-adlib-input"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="submit"
                    size="icon-xs"
                    data-cy="search-adlib-submit-btn"
                  >
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
