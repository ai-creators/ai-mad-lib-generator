import { useAppSelector } from "@/hooks/useAppSelector";
import { UserModel } from "@/models/UserModel";
import { useMultiplayerLobby } from "../../multiplayerLobbyContext";

export const useMultiplayerLobbyPlayersCard = (player: UserModel) => {
  const { user } = useAppSelector((state) => state.user);
  const { leaveLobby, kickPlayer, lobby } = useMultiplayerLobby();

  const isUser = player.id === user?.id;
  const isCreator = lobby?.creator.id === user.id;

  const submitLeaveLobby = () => {
    leaveLobby(user.id);
  };

  const submitKickPlayer = () => {
    if (player.id) {
      kickPlayer(player.id);
    }
  };

  return { isUser, submitLeaveLobby, submitKickPlayer, isCreator };
};
