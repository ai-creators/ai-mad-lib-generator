import { type inferProcedureOutput } from "@trpc/server";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type AppRouter } from "~/server/api/root";

type Adlib = inferProcedureOutput<AppRouter["adlib"]["getAdlibById"]>;

type AdlibPlayHeaderProps = {
  adlib: Adlib;
};

export default function AdlibPlayHeader({ adlib }: AdlibPlayHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{adlib.title}</CardTitle>
        <CardDescription>{adlib.prompt}...</CardDescription>
      </CardHeader>
    </Card>
  );
}
