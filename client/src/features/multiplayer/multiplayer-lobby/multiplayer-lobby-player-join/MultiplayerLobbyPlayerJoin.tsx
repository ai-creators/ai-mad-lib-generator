import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMultiplayerLobbyPlayerJoin } from "./MultiplayerLobbyPlayerJoin.hooks";

const MultiplayerLobbyPlayerJoin = () => {
  const { username, changeUsername } = useMultiplayerLobbyPlayerJoin();

  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="guestName"
          className="text-stone-600 dark:text-stone-400"
        >
          Username
        </label>
        <Input
          id="guestName"
          placeholder="username"
          value={username}
          onChange={(e) => changeUsername(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default MultiplayerLobbyPlayerJoin;
