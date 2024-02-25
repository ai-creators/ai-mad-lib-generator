import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMultiplayerLobbyPlayerJoin } from "./MultiplayerLobbyPlayerJoin.hooks";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/errors/ErrorAlert";

const MultiplayerLobbyPlayerJoin = () => {
  const { guestName, changeGuestName, error, submitJoin, isLoading } =
    useMultiplayerLobbyPlayerJoin();

  return (
    <Card className="flex flex-col gap-3 p-5">
      <ErrorAlert error={error} />
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
          value={guestName}
          onChange={(e) => changeGuestName(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={submitJoin}
          className="min-w-24"
          disabled={!guestName || isLoading}
        >
          {isLoading ? "Loading" : "Join"}
        </Button>
      </div>
    </Card>
  );
};

export default MultiplayerLobbyPlayerJoin;
