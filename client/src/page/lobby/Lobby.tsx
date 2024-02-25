import { Card } from "@/components/ui/card";
import Layout from "@/layout/Layout";
import Container from "@/layout/container/Container";
import NavbarSidebar from "@/layout/navbar/navbar-sidebar/NavbarSidebar";
import { useLobby } from "./Lobby.hooks";
import MultiplayerLobbyCode from "@/features/multiplayer/multiplayer-lobby/multiplayer-lobby-code/MultiplayerLobbyCode";
import MultiplayerLobbyPlayers from "@/features/multiplayer/multiplayer-lobby/multiplayer-lobby-players/MultiplayerLobbyPlayers";
import ErrorAlert from "@/errors/ErrorAlert";
import { useAppSelector } from "@/hooks/useAppSelector";
import MultiplayerLobbyPlayerJoin from "@/features/multiplayer/multiplayer-lobby/multiplayer-lobby-player-join/MultiplayerLobbyPlayerJoin";

const Lobby = () => {
  const { roomCode, players, isLoading, lobby, error } = useLobby();
  const { user } = useAppSelector((state) => state.user);
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
          <Card className="p-5 flex flex-col gap-5">
            <div className="flex justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">Evil Adlibs</h2>
                <p className="text-stone-600 dark:text-stone-400">
                  Public Lobby
                </p>
              </div>

              {roomCode ? <MultiplayerLobbyCode code={roomCode} /> : null}
            </div>
          </Card>
          {lobby ? (
            <MultiplayerLobbyPlayers lobby={lobby} players={players} />
          ) : null}
          {players.find((player) => player.id === user?.id) ? null : (
            <MultiplayerLobbyPlayerJoin />
          )}
        </section>
        {/* <aside className="col-span-3 "></aside> */}
      </Container>
    </Layout>
  );
};

export default Lobby;
