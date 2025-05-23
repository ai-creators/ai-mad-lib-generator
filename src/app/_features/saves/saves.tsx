import React from "react";
import Container from "~/app/_components/containers/container";
import Layout from "~/app/_components/layouts/layout";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import AdlibSaves from "./adlib-saves/adlib-saves";
import { Alert } from "~/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function Saves() {
  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3 hidden md:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <Alert variant="warning">
            <span className="flex items-center gap-2">
              Saves are currently unavailable at the moment.
              <TriangleAlert size={18} />
            </span>
          </Alert>
          <AdlibSaves />
        </section>
      </Container>
    </Layout>
  );
}
