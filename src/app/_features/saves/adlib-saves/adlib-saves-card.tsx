import { type inferProcedureOutput } from "@trpc/server";
import { Link } from "lucide-react";
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
      <CardContent>
        <Link
          href={routerConfig.adlib.execute({ id: adlib.id })}
          className={buttonVariants({ variant: "default" })}
        >
          Go to adlib
        </Link>
      </CardContent>
    </Card>
  );
}
