"use client";

import React from "react";
import Container from "~/app/_components/containers/container";
import Layout from "~/app/_components/layouts/layout";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import BrowseSearchCard from "./browse-search/browse-search-card";
import BrowseFeed from "./browse-feed/browse-feed";
import { useRouter } from "next/navigation";
import { type searchSchema } from "./browse-search/browse-search-form";
import { type z } from "zod";

export default function Browse() {
  const router = useRouter();

  const handleSearch = (values: z.infer<typeof searchSchema>) => {
    router.push(`/categories/${values.search}`);
  };

  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3 hidden md:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <BrowseSearchCard onSubmit={handleSearch} />
          <BrowseFeed />
        </section>
      </Container>
    </Layout>
  );
}
