import { useAppDispatch } from "@/hooks/useAppDispatch";
import useSocket from "@/hooks/useSocket";
import { ErrorModel } from "@/models/ErrorModel";
import { UserModel } from "@/models/UserModel";
import { LobbyModel } from "@/models/mutliplayer/LobbyModel";
import { lobbyService } from "@/services/LobbyService";
import { setGlobalError } from "@/slices/globalErrorSlice";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";

interface LobbyContextType {
  lobby: LobbyModel | null;
  players: UserModel[];
  joinLobby: (userId: number) => void;
  isLoading: boolean;
}

const MultiplayerLobbyContext = createContext<LobbyContextType>({
  lobby: null,
  players: [],
  joinLobby: () => {},
  isLoading: false,
});

export const useMultiplayerLobby = () => {
  const context = useContext(MultiplayerLobbyContext);
  if (context === undefined) {
    throw new Error("useLobby must be used within a LobbyProvider");
  }
  return context;
};

export const MultiplayerLobbyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { roomCode } = useParams();
  const [lobby, setLobby] = useState<LobbyModel | null>(null);
  const [players, setPlayers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const queryOptions = useMemo(
    () => ({ query: { roomId: roomCode } }),
    [roomCode]
  );
  const socket = useSocket(queryOptions);

  useEffect(() => {
    setIsLoading(true);
    let ignore = false;
    if (roomCode) {
      (async () => {
        const [data, apiError] = await lobbyService.findByRoomCode(roomCode);

        if (data && !ignore) {
          setLobby(data);
        }

        if (apiError && !ignore) {
          dispatch(setGlobalError(apiError));
        }
      })();
    }
    setIsLoading(false);

    return () => {
      ignore = true;
    };
  }, [roomCode]);

  useEffect(() => {
    setIsLoading(true);
    if (socket) {
      socket.on("playersUpdate", (updatedPlayers) => {
        setPlayers(updatedPlayers);
      });
    }

    setIsLoading(false);

    return () => {
      if (socket) {
        socket.off("playersUpdate");
      }
    };
  }, [socket, roomCode]);

  const joinLobby = (userId: number) => {
    console.log("JOINING LOBBY: ", userId, roomCode);
    setIsLoading(true);
    if (socket) {
      socket.emit("joinLobby", { roomCode, userId });
    }
    setIsLoading(false);
  };

  return (
    <MultiplayerLobbyContext.Provider
      value={{ lobby, players, joinLobby, isLoading }}
    >
      {children}
    </MultiplayerLobbyContext.Provider>
  );
};
