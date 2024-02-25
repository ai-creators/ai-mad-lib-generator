import { Card } from "@/components/ui/card";
import { useMultiplayerLobbyJoin } from "./MultiplayerLobbyJoin.hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/errors/ErrorAlert";

const MultiplayerLobbyJoin = () => {
  const { lobbyCode, changeLobbyCode, joinLobby, error, isLoading } =
    useMultiplayerLobbyJoin();
  return (
    <Card className="p-5 flex flex-col gap-5">
      <ErrorAlert error={error} />
      <div>
        <h3 className="text-2xl font-semibold">Join Room</h3>
        <p className="text-stone-600 dark:text-stone-400">
          Join room using room code
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lobbyCode">Room Code</label>
        <Input
          value={lobbyCode}
          onChange={(e) => changeLobbyCode(e.target.value)}
          placeholder="Room Code"
        />
      </div>
      <div>
        <Button
          onClick={joinLobby}
          disabled={lobbyCode.length !== 6 || isLoading}
        >
          Join Lobby
        </Button>
      </div>
    </Card>
  );
};

export default MultiplayerLobbyJoin;
