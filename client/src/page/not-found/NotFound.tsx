import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  return (
    <Layout>
      <div data-testid="not-found" className="flex justify-center items-center">
        <Card className="p-5 flex flex-col gap-5 max-w-4xl py-5">
          <div className="text-center">
            <h1 className="text-5xl font-bold">404</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              The page you are looking for cannot be found.
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/" className={buttonVariants({ variant: "outline" })}>
              Go back to home
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default NotFound;
