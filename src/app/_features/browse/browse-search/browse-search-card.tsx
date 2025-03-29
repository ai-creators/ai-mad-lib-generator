import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import BrowseSearchForm from "./browse-search-form";

type BrowseSearchCardProps = {
  title?: string;
  description?: string;
};

export default function BrowseSearchCard({
  title = "Search and adlib",
  description = "Search user created adlibs",
}: BrowseSearchCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <BrowseSearchForm />
      </CardContent>
    </Card>
  );
}
