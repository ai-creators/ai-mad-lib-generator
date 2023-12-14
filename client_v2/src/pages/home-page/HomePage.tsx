import { useAuth0 } from "@auth0/auth0-react";
import Card from "../../components/card/Card";
import Container from "../../components/container/Container";
import CreateAdlibCard from "../../components/create/create-adlib-card/CreateAdlibCard";
import NavbarItems from "../../components/navbar/navbar-items/NavbarItems";
import Layout from "../../layout/Layout";
import { useEffect } from "react";
import { getProtectedMessage } from "../../services/MessageService";

const HomePage = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedMessage(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        console.log(data);
      }

      if (error) {
        console.log(error);
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <Layout>
      <Container className="custom-grid gap-5 py-5">
        <aside className="flex flex-col gap-5">
          <Card>
            <p>
              Join the Ai Adlibs community to save you're ai generated adlibs
            </p>
          </Card>
          <NavbarItems />
        </aside>
        <section>
          <CreateAdlibCard />
        </section>
        <section></section>
      </Container>
    </Layout>
  );
};

export default HomePage;
