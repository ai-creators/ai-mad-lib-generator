import { useAuth0 } from "@auth0/auth0-react";
import Card from "../../components/card/Card";
import Container from "../../components/container/Container";
import CreateAdlibCard from "../../components/create/create-adlib-card/CreateAdlibCard";
import NavbarItems from "../../components/navbar/navbar-items/NavbarItems";
import Layout from "../../layout/Layout";
import ButtonLogin from "../../components/button/button-login/ButtonLogin";
import ButtonSignup from "../../components/button/button-signup/ButtonSignup";
import Feed from "../../components/feed/Feed";

const HomePage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Layout>
      <Container className="custom-grid gap-5 py-5">
        <aside className="flex flex-col gap-5 hidden lg:block">
          {!isAuthenticated ? (
            <Card className="flex flex-col gap-5">
              <p>
                Join the Ai Adlibs community to save you're ai generated adlibs
              </p>
              <div className="flex flex-col gap-3">
                <ButtonSignup className="w-full" />
                <ButtonLogin className="w-full" />
              </div>
            </Card>
          ) : null}

          <NavbarItems />
        </aside>
        <section className="flex flex-col gap-5">
          <CreateAdlibCard />
          <Feed />
        </section>
        <section></section>
      </Container>
    </Layout>
  );
};

export default HomePage;
