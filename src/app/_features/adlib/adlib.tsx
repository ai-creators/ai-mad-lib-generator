import React from "react";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import AdlibHeader from "./adlib-header";
import { api } from "~/trpc/server";
import Layout from "~/app/_components/layouts/layout";
import Container from "~/app/_components/containers/container";

interface AdlibProps {
  adlibId: string;
}

export default async function Adlib({ adlibId }: AdlibProps) {
  if (!adlibId) {
    throw new Error("Adlib ID is required");
  }

  const data = await api.adlib.getAdlibById(adlibId);

  if (!data) {
    return <div>Adlib not found</div>;
  }

  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3 hidden lg:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <AdlibHeader adlib={data} />
        </section>
      </Container>
    </Layout>
  );
}
