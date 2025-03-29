"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { routerConfig } from "~/app/router-config";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

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
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={placeholder}
                    className="pr-24"
                    {...field}
                  />
                  <Button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-none"
                  >
                    Search
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
