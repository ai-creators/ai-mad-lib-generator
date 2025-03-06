import React from "react";
import Layout from "../_components/layouts/layout";
import Container from "../_components/containers/container";
import AsideNavbar from "../_components/navbars/aside-navbar";
import CreateAdlibCard from "../_features/create-adlib/create-adlib-card";

export default function CreatePage() {
  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3">
          <AsideNavbar />
        </aside>
        <section className="col-span-9">
          <CreateAdlibCard />
        </section>
      </Container>
    </Layout>
  );
}
