import PageLoader from "@/components/loader/page-loader/PageLoader";
import { useAdlibView } from "./AdlibView.hooks";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import AdlibViewer from "@/features/adlib/adlib-viewer/AdlibViewer";
import ErrorAlert from "@/errors/ErrorAlert";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";
import { Card } from "@/components/ui/card";

const AdlibView = () => {
  const {
    response,
    isLoading,
    error,
    isSaved,
    toggleSaveResponse,
    copyAdlibLink,
    isAdlibCopied,
    isAdlibResponseCopied,
    copyAdlibResponseLink,
  } = useAdlibView();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
        <aside className="hidden lg:flex flex-col gap-5 col-span-3">
          <Card className="p-2">
            <NavbarSidebar />
          </Card>
        </aside>
        <section className="col-span-12 lg:col-span-9 flex flex-col gap-5">
          <ErrorAlert error={error} />
          {response ? <AdlibViewer response={response} /> : null}
          <ul className="flex flex-col sm:flex-row gap-3">
            <li>
              <Button onClick={toggleSaveResponse} className="w-full sm:w-32">
                {isSaved ? "Saved Response" : "Save Response"}
              </Button>
            </li>
            <li>
              <Button onClick={copyAdlibLink} className="w-full sm:w-40">
                {isAdlibCopied ? "Copied" : "Copy"} Adlib{" "}
                <ClipboardCopy className="ml-3" size={18} />
              </Button>
            </li>
            <li>
              <Button
                onClick={copyAdlibResponseLink}
                className="w-full sm:w-52"
              >
                {isAdlibResponseCopied ? "Copied" : "Copy"} Adlib Resposne{" "}
                <ClipboardCopy className="ml-3" size={18} />
              </Button>
            </li>
          </ul>
        </section>
        {/* <aside className="col-span-3 "></aside> */}
      </Container>
    </Layout>
  );
};

export default AdlibView;
