import { useAppSelector } from "@/hooks/useAppSelector";
import { UserModel } from "@/models/UserModel";

export const useMultiplayerLobbyPlayersCard = (player: UserModel) => {
  const { user } = useAppSelector((state) => state.user);

  const isUser = player.id === user?.id;

  return { isUser };
};
