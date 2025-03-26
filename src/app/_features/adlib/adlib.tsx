"use client";

import { Layout, Container } from "lucide-react";
import React from "react";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import AdlibHeader from "./adlib-header"; // Replace with your actual server-side function
import { api } from "~/trpc/react";

interface AdlibProps {
  adlibId: string;
}

export default function Adlib({ adlibId }: AdlibProps) {
  if (!adlibId) {
    throw new Error("Adlib ID is required");
  }

  const { data, isPending } = api.adlib.getAdlibById.useQuery(adlibId);

  if (isPending) {
    return (
      <Layout>
        <Container className="grid grid-cols-12 gap-6 px-4 py-6">
          <aside className="col-span-3">
            <AsideNavbar />
          </aside>
          <section className="col-span-9 flex flex-col gap-6">
            <p>Loading...</p>
          </section>
        </Container>
      </Layout>
    );
  }

  if (!data) {
    return <div>Adlib not found</div>;
  }

  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3">
          <AsideNavbar />
        </aside>
        <section className="col-span-9 flex flex-col gap-6">
          <AdlibHeader adlib={data} />
        </section>
      </Container>
    </Layout>
  );
}
