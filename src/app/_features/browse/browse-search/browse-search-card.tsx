import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import BrowseSearchForm from "./browse-search-form";

export default function BrowseSearchCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Search an adlib</CardTitle>
        <CardDescription>Search user created adlibs</CardDescription>
      </CardHeader>
      <CardContent>
        <BrowseSearchForm />
      </CardContent>
    </Card>
  );
}
