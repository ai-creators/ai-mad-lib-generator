"use client";

import React from "react";
import Container from "~/app/_components/containers/container";
import Layout from "~/app/_components/layouts/layout";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import AdlibPlayHeader from "./adlib-play-header";
import { api } from "~/trpc/react";
import AdlibPlayQuestions from "./adlib-play-questions/adlib-play-questions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AdlibPlayProps {
  adlibId: string;
}

export default function AdlibPlay({ adlibId }: AdlibPlayProps) {
  const router = useRouter();

  if (!adlibId) {
    throw new Error("Adlib ID is required");
  }

  const { data, isPending } = api.adlib.getAdlibByIdPlay.useQuery(adlibId);

  const { mutateAsync: saveResult } = api.adlib.saveAdlibResult.useMutation({
    onSuccess: (resultId) => {
      router.push(`/adlib/${adlibId}/play/${resultId}`);
    },
  });

  if (isPending) {
    return (
      <Layout>
        <Container className="grid grid-cols-12 gap-6 px-4 py-6">
          <aside className="col-span-3 hidden lg:block">
            <AsideNavbar />
          </aside>
          <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
            <p>Loading...</p>
          </section>
        </Container>
      </Layout>
    );
  }

  if (!data) {
    return <div>Adlib not found</div>;
  }

  const adlibSubmit = async (answers: string[]) => {
    try {
      await saveResult({
        adlibId,
        answers,
      });
    } catch (error) {
      toast.error("Failed to save adlib result. Please try again.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Layout>
      <Container className="grid grid-cols-12 gap-6 px-4 py-6">
        <aside className="col-span-3 hidden lg:block">
          <AsideNavbar />
        </aside>
        <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
          <AdlibPlayHeader adlib={data} />
          <AdlibPlayQuestions adlib={data} onSubmit={adlibSubmit} />
        </section>
      </Container>
    </Layout>
  );
}
