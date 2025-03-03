"use client";

import React from "react";
import Container from "~/app/_components/containers/container";
import Layout from "~/app/_components/layouts/layout";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import BrowseSearchCard from "./browse-search/browse-search-card";
import BrowseFeed from "./browse-feed/browse-feed";

export default function Browse() {
  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="hidden col-span-3 md:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <BrowseSearchCard />
          <BrowseFeed />
        </section>
      </Container>
    </Layout>
  );
}
