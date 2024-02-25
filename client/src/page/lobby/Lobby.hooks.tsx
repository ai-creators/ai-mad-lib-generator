import useSocket from "@/hooks/useSocket";
import { ErrorModel } from "@/models/ErrorModel";
import { UserModel } from "@/models/UserModel";
import { LobbyModel } from "@/models/mutliplayer/LobbyModel";
import { lobbyService } from "@/services/LobbyService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useLobby = () => {
  const { roomCode } = useParams();
  const socket = useSocket({ query: { roomId: roomCode } });

  const [lobby, setLobby] = useState<LobbyModel | null>(null);
  const [players, setPlayers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on("playersUpdate", (updatedPlayers) => {
        setPlayers(updatedPlayers);
      });
    }
  }, [socket, roomCode]);

  useEffect(() => {
    let ignore = false;
    if (roomCode) {
      (async () => {
        const [data, apiError] = await lobbyService.findByRoomCode(roomCode);

        if (data && !ignore) {
          setLobby(data);
        }

        if (apiError && !ignore) {
          setError(apiError);
        }
      })();
    }

    return () => {
      ignore = true;
    };
  }, [roomCode]);

  return { roomCode, players, isLoading, lobby, error };
};
