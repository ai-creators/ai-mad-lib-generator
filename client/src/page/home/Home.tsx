import Container from "@/layout/container/Container";
import Layout from "../../layout/Layout";
import AdlibCreateCard from "@/features/adlib/adlib-create/adlib-create-card/AdlibCreateCard";
import AdlibFeatured from "@/features/adlib/adlib-featured/AdlibFeatured";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";
import { Card } from "@/components/ui/card";
import LoginButton from "@/components/button/auth/LoginButton";
import SignupButton from "@/components/button/auth/SignupButton";

const Home = () => {
  return (
    <Layout>
      <div data-testid="home">
        <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
          <aside className="hidden lg:flex flex-col gap-5 col-span-3">
            <Card className="p-2">
              <NavbarSidebar />
            </Card>
          </aside>
          <section className="col-span-12 lg:col-span-9 flex flex-col gap-5">
            <AdlibCreateCard />
            <AdlibFeatured />
          </section>
          {/* <aside className="col-span-3 "></aside> */}
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
