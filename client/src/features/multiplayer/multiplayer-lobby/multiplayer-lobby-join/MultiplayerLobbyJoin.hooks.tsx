import { ErrorModel } from "@/models/ErrorModel";
import { lobbyService } from "@/services/LobbyService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useMultiplayerLobbyJoin = () => {
  const [lobbyCode, setLobbyCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);
  const navigate = useNavigate();

  const changeLobbyCode = (value: string) => {
    // Check if the value is alphanumeric and has a length of up to 6 characters
    if (value.length <= 6 && /^[a-zA-Z0-9]+$/.test(value)) {
      setLobbyCode(value.toUpperCase());
    }
  };

  const joinLobby = async () => {
    setError(null);
    setIsLoading(true);
    if (lobbyCode.length !== 6) {
      setError({ message: "Lobby code needs to be 6 characters long" });
    }
    const [data, apiError] = await lobbyService.findByRoomCode(lobbyCode);

    if (data) {
      navigate(`lobby/${data.roomCode}`);
    }

    if (apiError) {
      setError(apiError);
    }
    setIsLoading(false);
  };

  return { lobbyCode, changeLobbyCode, joinLobby, error, isLoading };
};
