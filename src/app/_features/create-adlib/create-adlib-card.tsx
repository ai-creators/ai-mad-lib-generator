import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import CreateAdlibForm from "./create-adlib-form";

export default function CreateAdlibCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate an Adlib</CardTitle>
        <CardDescription>Enter a prompt to generate an adlib</CardDescription>
      </CardHeader>
      <CreateAdlibForm />
    </Card>
  );
}
