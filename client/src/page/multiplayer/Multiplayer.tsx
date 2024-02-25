import { Card } from "@/components/ui/card";
import MultiplayerLobbyCreator from "@/features/multiplayer/multiplayer-lobby/multiplayer-lobby-creator/MultiplayerLobbyCreator";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";

const Multiplayer = () => {
  return (
    <Layout>
      <Container className="px-3 lg:px-0 py-5 grid-cols-12 grid gap-5">
        <aside className="hidden lg:flex flex-col gap-5 col-span-3">
          <Card className="p-2">
            <NavbarSidebar />
          </Card>
        </aside>
        <section className="col-span-12 lg:col-span-9 flex flex-col gap-5">
          <Card className="p-5 flex flex-col gap-5">
            <div>
              <h3 className="text-2xl font-semibold">Evil Adlibs</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Join or Create a lobby
              </p>
            </div>
            <div className="flex gap-5">
              <MultiplayerLobbyCreator />
            </div>
          </Card>
        </section>
      </Container>
    </Layout>
  );
};

export default Multiplayer;
