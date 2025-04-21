"use client";

import React, { Suspense } from "react";
import Container from "~/app/_components/containers/container";
import Layout from "~/app/_components/layouts/layout";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import CreateAdlibCard from "../create-adlib/create-adlib-card";
import Featured from "../featured/featured";
import { ErrorBoundary } from "react-error-boundary";
import BrowseFeed from "../browse/browse-feed/browse-feed";

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-red-500">Something went wrong:</p>
      <pre className="text-sm">{error.message}</pre>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3 hidden lg:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 lg:col-span-9">
          <CreateAdlibCard />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<div>Loading feed...</div>}>
              <BrowseFeed />
            </Suspense>
          </ErrorBoundary>
        </section>
      </Container>
    </Layout>
  );
}
