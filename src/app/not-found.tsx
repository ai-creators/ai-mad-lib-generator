import React from "react";
import Layout from "./_components/layouts/layout";
import Link from "next/link";
import { routerConfig } from "./router-config";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center py-48">
        <p className="mb-5 text-xl font-bold">
          The Page you are looking for cannot be found
        </p>
        <Link
          href={routerConfig.root.path}
          className={cn(buttonVariants({ variant: "default" }), "")}
        >
          Return Home
        </Link>
      </div>
    </Layout>
  );
}
