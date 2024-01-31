import { Card } from "@/components/ui/card";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import { useAdlib } from "./Adlib.hooks";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import ErrorAlert from "@/errors/ErrorAlert";
import PageLoader from "@/components/loader/page-loader/PageLoader";

const Adlib = () => {
  const { adlib, error, isLoading } = useAdlib();

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <Layout>
      <div data-testid="home">
        <Container className="px-3 lg:px-0 py-5 grid-cols-9 grid gap-5">
          <section className="col-span-9 lg:col-span-6 flex flex-col gap-5">
            <ErrorAlert error={error} />
            <Card className="p-5 flex flex-col gap-5">
              <header>
                <h2 className="text-2xl font-semibold">{adlib?.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Prompt: {adlib?.prompt}...
                </p>
              </header>
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <Link
                    to="play"
                    className={buttonVariants({ variant: "default" })}
                  >
                    Play adlib
                  </Link>
                </div>
              </div>
            </Card>
          </section>
          <aside className="col-span-3 "></aside>
        </Container>
      </div>
    </Layout>
  );
};

export default Adlib;
