import { AxiosRequestConfig } from "axios";
import api from "./Api";
import { ApiResponse } from "@/models/ApiResponseModel";
import { LobbyModel } from "@/models/mutliplayer/LobbyModel";

const createLobby = (userId: string): Promise<ApiResponse<LobbyModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/lobby",
    method: "POST",
    params: {
      userId,
    },
  };

  return api.callExternalApi<LobbyModel>({ config });
};

const findByRoomCode = (roomCode: string): Promise<ApiResponse<LobbyModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/lobby/find/room-code",
    params: {
      roomCode,
    },
  };

  return api.callExternalApi<LobbyModel>({ config });
};

const lobbyService = {
  createLobby,
  findByRoomCode,
};

Object.freeze(lobbyService);
export { lobbyService };
