import { Card } from "@/components/ui/card";
import { UserModel } from "@/models/UserModel";
import { LobbyModel } from "@/models/mutliplayer/LobbyModel";

type Props = {
  lobby: LobbyModel;
  players: UserModel[];
};

const MultiplayerLobbyPlayers = ({ lobby, players }: Props) => {
  return (
    <Card className="p-5 flex flex-col gap-5">
      <div>
        <h3 className="text-2xl font-semibold">
          {players.length}/{lobby?.maxPlayers || 10} Players
        </h3>
      </div>
      <ul className="flex flex-col gap-3">
        {players.map((player) => (
          <li key={player.id}>{player?.guestName ?? "Guest User"}</li>
        ))}
      </ul>
    </Card>
  );
};

export default MultiplayerLobbyPlayers;
