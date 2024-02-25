import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";

export const useMultiplayerLobbyPlayerJoin = () => {
  const { user } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setUsername(user?.username);
  }, [user?.username]);

  const changeUsername = (value: string) => {
    setUsername(value);
  };

  return { username, changeUsername };
};
