import { type inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import React from "react";
import { routerConfig } from "~/app/router-config";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { type AppRouter } from "~/server/api/root";
import AdlibSaveButton from "~/app/_features/saves/adlib-save-button";

type Adlib = inferProcedureOutput<AppRouter["adlib"]["getSaves"]>[number];
type Props = {
  adlib: Adlib;
};

export default function AdlibSavesCard({ adlib }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{adlib.title}</CardTitle>
        <CardDescription>Prompt: {adlib.prompt}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Link
          href={routerConfig.adlib.execute({ id: adlib.id })}
          className={buttonVariants({ variant: "default" })}
        >
          Go to adlib
        </Link>
        <AdlibSaveButton adlibId={adlib.id} />
      </CardContent>
    </Card>
  );
}
