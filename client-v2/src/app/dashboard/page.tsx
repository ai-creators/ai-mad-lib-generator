import { Container } from "@/components/container/container";
import AsideNavbar from "@/components/layout/aside-navbar/aside-navbar";
import Layout from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import AdlibFeatured from "@/features/adlib/adlib-featured/adlib-featured";
import React from "react";

const DashboardPage = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-12 py-8 gap-8">
        <aside className="col-span-3 sticky top-0">
          <Card className="p-5">
            <AsideNavbar />
          </Card>
        </aside>
        <section className="col-span-6">
          <AdlibFeatured />
        </section>
        <aside className="col-span-3"></aside>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
