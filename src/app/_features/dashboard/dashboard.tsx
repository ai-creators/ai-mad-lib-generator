import React from "react";
import Container from "~/app/_components/containers/container";
import Layout from "~/app/_components/layouts/layout";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import CreateAdlibCard from "../create-adlib/create-adlib-card";
import Featured from "../featured/featured";

export default function Dashboard() {
  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3">
          <AsideNavbar />
        </aside>
        <section className="col-span-9 flex flex-col gap-6">
          <CreateAdlibCard />
          <Featured />
        </section>
      </Container>
    </Layout>
  );
}
