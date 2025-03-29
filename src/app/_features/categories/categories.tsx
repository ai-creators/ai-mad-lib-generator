"use client";

import React from "react";
import Container from "~/app/_components/containers/container";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";

import BrowseSearchCard from "../browse/browse-search/browse-search-card";
import CategoriesFeed from "./categories-feed/categories-feed";
import Layout from "~/app/_components/layouts/layout";
import { useRouter } from "next/navigation";
import { type searchSchema } from "../browse/browse-search/browse-search-form";
import { type z } from "zod";
import { routerConfig } from "~/app/router-config";

export default function Categories() {
  const router = useRouter();

  const handleSearch = (values: z.infer<typeof searchSchema>) => {
    router.push(routerConfig.categories.execute({ category: values.search }));
  };

  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3 hidden md:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <BrowseSearchCard
            title="Search a category"
            description="Search automatically generated categories"
            placeholder="search categories..."
            onSubmit={handleSearch}
          />
          <CategoriesFeed />
        </section>
      </Container>
    </Layout>
  );
}
