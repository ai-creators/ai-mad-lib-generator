"use client";

import { type inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import React from "react";
import { routerConfig } from "~/app/router-config";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type AppRouter } from "~/server/api/root";

type Adlib = inferProcedureOutput<AppRouter["adlib"]["getAdlibById"]>;

type AdlibHeaderProps = {
  adlib: Adlib;
};

export default function AdlibHeader({ adlib }: AdlibHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{adlib.title}</CardTitle>
        <CardDescription>Prompt: {adlib.prompt}</CardDescription>
      </CardHeader>
      <CardContent>
        {adlib.id ? (
          <Link
            href={routerConfig.adlibPlay.execute({ id: adlib.id })}
            className={buttonVariants({ variant: "default" })}
          >
            Play Adlib
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
