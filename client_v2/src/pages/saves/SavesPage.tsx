import { useAuth0 } from "@auth0/auth0-react";
import ButtonLogin from "../../components/button/button-login/ButtonLogin";
import ButtonSignup from "../../components/button/button-signup/ButtonSignup";
import Card from "../../components/card/Card";
import Container from "../../components/container/Container";
import NavbarItems from "../../components/navbar/navbar-items/NavbarItems";
import Layout from "../../layout/Layout";
import AdlibBookmarks from "../../components/adlib/adlib-bookmarks/AdlibBookmarks";

const SavesPage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Layout>
      <Container className="custom-grid gap-5 py-5">
        <aside className="flex-col gap-5 hidden lg:flex">
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
          <AdlibBookmarks />
        </section>
        <div></div>
      </Container>
    </Layout>
  );
};

export default SavesPage;
