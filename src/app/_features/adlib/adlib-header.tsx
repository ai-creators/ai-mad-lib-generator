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
import AdlibSaveButton from "~/app/_features/saves/adlib-save-button";
import AdlibReactions from "~/app/_features/reactions/adlib-reactions";

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
      <CardContent className="flex flex-col gap-4">
        {adlib.id ? (
          <>
            <div className="flex items-center gap-2">
              <Link
                href={routerConfig.adlibPlay.execute({ id: adlib.id })}
                className={buttonVariants({ variant: "default" })}
                data-cy="play-adlib-btn"
              >
                Play Adlib
              </Link>
              <AdlibSaveButton adlibId={adlib.id} />
            </div>
            <AdlibReactions adlibId={adlib.id} />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
