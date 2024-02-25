import { Button } from "@/components/ui/button";
import { useMultiplayerLobbyCreator } from "./MultiplayerLobbyCreator.hooks";

const MultiplayerLobbyCreator = () => {
  const { createLobby, isLoading } = useMultiplayerLobbyCreator();
  return (
    <Button onClick={createLobby} disabled={isLoading}>
      {isLoading ? "Loading" : "Create a Lobby"}
    </Button>
  );
};

export default MultiplayerLobbyCreator;
