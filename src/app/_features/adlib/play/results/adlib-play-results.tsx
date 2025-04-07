"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import Layout from "~/app/_components/layouts/layout";
import Container from "~/app/_components/containers/container";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import { type Components } from "react-markdown";
import AdlibPlayResultsActions from "./adlib-play-results-actions";

type AdlibPlayResultsProps = {
  resultId: string;
};

export default function AdlibPlayResults({ resultId }: AdlibPlayResultsProps) {
  const { data: result, isPending } =
    api.adlib.getAdlibResult.useQuery(resultId);

  const markdownComponents: Components = {
    strong: ({ node: _node, ...props }) => (
      <strong
        className="font-black text-primary underline decoration-2"
        {...props}
      />
    ),
  };

  if (isPending) {
    return (
      <Layout>
        <Container className="grid grid-cols-12 gap-6 px-4 py-6">
          <aside className="col-span-3 hidden lg:block">
            <AsideNavbar />
          </aside>
          <section className="col-span-12 lg:col-span-9">
            <p>Loading...</p>
          </section>
        </Container>
      </Layout>
    );
  }

  if (!result) {
    return <div>Result not found</div>;
  }

  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="hidden lg:col-span-3 lg:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 lg:col-span-9">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{result.adlibTitle}</CardTitle>
                  <CardDescription>{result.adlibPrompt}</CardDescription>
                </div>
                <div className="-mt-2">
                  <AdlibPlayResultsActions
                    resultText={result.resultText}
                    title={result.adlibTitle}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
                <ReactMarkdown components={markdownComponents}>
                  {result.resultText}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </section>
      </Container>
    </Layout>
  );
}
