import { Container } from "@/components/container/container";
import AsideNavbar from "@/components/layout/aside-navbar/aside-navbar";
import Layout from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import AdlibFeatured from "@/features/adlib/adlib-featured/adlib-featured";
import AdsCard from "@/features/ads/ads-card/ads-card";
import React from "react";

const DashboardPage = () => {
  return (
    <Layout>
      <Container className="grid grid-cols-12 py-0 md:py-8 gap-3 lg:gap-8 px-0 md:px-3 lg:px-0">
        <aside className="col-span-3 sticky top-0 hidden md:block">
          <Card className="p-3">
            <AsideNavbar />
          </Card>
        </aside>
        <section className="col-span-12 md:col-span-9 lg:col-span-6">
          <AdlibFeatured />
        </section>
        <aside className="col-span-3 hidden lg:block">
          <AdsCard />
        </aside>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
