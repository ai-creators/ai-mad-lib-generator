import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useMultiplayerLobby } from "../multiplayerLobbyContext";
import { userService } from "@/services/UserService";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ErrorModel } from "@/models/ErrorModel";
import { setUser } from "@/slices/userSlice";

export const useMultiplayerLobbyPlayerJoin = () => {
  const { user } = useAppSelector((state) => state.user);
  const [guestName, setGuestName] = useState<string>(user.guestName);
  const [error, setError] = useState<ErrorModel | null>(null);
  const { joinLobby, isLoading } = useMultiplayerLobby();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setGuestName(user.guestName);
  }, [user.guestName]);

  useEffect(() => {
    setGuestName(user?.username);
  }, [user?.username]);

  const changeGuestName = (value: string) => {
    setGuestName(value);
  };

  const submitJoin = async () => {
    setError(null);
    if (user.guestName !== guestName && guestName.length) {
      const userToUpdate = { ...user };
      userToUpdate.guestName = guestName;
      const [data, apiError] = await userService.upsertUser(userToUpdate);

      if (data) {
        dispatch(setUser(data));
      }

      if (apiError) {
        setError(apiError);
      }
    }

    joinLobby(user.id);
  };

  return { guestName, changeGuestName, submitJoin, error, isLoading };
};
