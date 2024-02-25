import { Card } from "@/components/ui/card";
import MultiplayerLobbyCode from "./multiplayer-lobby-code/MultiplayerLobbyCode";
import MultiplayerLobbyPlayers from "./multiplayer-lobby-players/MultiplayerLobbyPlayers";
import MultiplayerLobbyPlayerJoin from "./multiplayer-lobby-player-join/MultiplayerLobbyPlayerJoin";
import { useParams } from "react-router-dom";
import { useMultiplayerLobby } from "./multiplayerLobbyContext";
import { useAppSelector } from "@/hooks/useAppSelector";

const MultiplayerLobby = () => {
  const { roomCode } = useParams();
  const { lobby, players } = useMultiplayerLobby();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-5">
      <Card className="p-5 flex flex-col gap-5">
        <div className="flex justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Evil Adlibs</h2>
            <p className="text-stone-600 dark:text-stone-400">Public Lobby</p>
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
    </div>
  );
};

export default MultiplayerLobby;
