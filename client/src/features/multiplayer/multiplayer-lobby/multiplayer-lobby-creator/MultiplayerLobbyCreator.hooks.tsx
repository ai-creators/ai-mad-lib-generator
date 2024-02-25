import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { lobbyService } from "@/services/LobbyService";
import { userService } from "@/services/UserService";
import { setGlobalError, voidGlobalError } from "@/slices/globalErrorSlice";
import { setUser } from "@/slices/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useMultiplayerLobbyCreator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLobby = async () => {
    setIsLoading(true);
    dispatch(voidGlobalError());
    if (!user?.id) {
      await createUser();
    }

    const [data, error] = await lobbyService.createLobby(user.id);

    if (data) {
      navigate(`lobby/${data.roomCode}`);
    }

    if (error) {
      dispatch(setGlobalError(error));
    }
    setIsLoading(false);
  };

  const createUser = async () => {
    const [data] = await userService.createUser();
    if (data) {
      dispatch(setUser(data));
    }
  };

  return { isLoading, createLobby };
};
