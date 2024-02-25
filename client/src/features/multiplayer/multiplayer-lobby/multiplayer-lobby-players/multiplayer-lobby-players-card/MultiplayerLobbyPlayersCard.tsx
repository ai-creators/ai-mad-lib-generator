import { Card } from "@/components/ui/card";
import { UserModel } from "@/models/UserModel";
import { useMultiplayerLobbyPlayersCard } from "./MutliplayerLobbyPlayersCard.hooks";
import { Button } from "@/components/ui/button";
import { useMultiplayerLobby } from "../../multiplayerLobbyContext";

type Props = {
  player: UserModel;
};

const MultiplayerLobbyPlayersCard = ({ player }: Props) => {
  const { isUser, submitLeaveLobby, submitKickPlayer, isCreator } =
    useMultiplayerLobbyPlayersCard(player);
  const { lobby } = useMultiplayerLobby();
  return (
    <Card className="p-5">
      <div className="flex justify-between gap-5">
        <h5 className="font-semibold text-lg">
          {lobby?.creator?.id === player.id ? (
            <span className="mr-1">👑</span>
          ) : null}
          {player?.guestName ?? "Guest User"}
        </h5>
        {isUser ? (
          <Button variant="destructive" onClick={submitLeaveLobby}>
            Leave Lobby
          </Button>
        ) : null}
        {isCreator && !isUser ? (
          <Button variant="destructive" onClick={submitKickPlayer}>
            Kick Player
          </Button>
        ) : null}
      </div>
    </Card>
  );
};

export default MultiplayerLobbyPlayersCard;
