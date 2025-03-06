import React from "react";
import Container from "~/app/_components/containers/container";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";

import BrowseSearchCard from "../browse/browse-search/browse-search-card";
import CategoriesFeed from "./categories-feed/categories-feed";
import Layout from "~/app/_components/layouts/layout";

export default function Categories() {
  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3 hidden md:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <BrowseSearchCard />
          <CategoriesFeed />
        </section>
      </Container>
    </Layout>
  );
}
