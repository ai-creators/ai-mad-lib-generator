import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import BrowseSearchForm, { type searchSchema } from "./browse-search-form";
import { type z } from "zod";

type BrowseSearchCardProps = {
  title?: string;
  description?: string;
  placeholder?: string;
  onSubmit: (values: z.infer<typeof searchSchema>) => void;
};

export default function BrowseSearchCard({
  title = "Search and adlib",
  description = "Search user created adlibs",
  placeholder,
  onSubmit,
}: BrowseSearchCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <BrowseSearchForm placeholder={placeholder} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
