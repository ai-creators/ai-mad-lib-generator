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

const lobbyService = {
  createLobby,
};

Object.freeze(lobbyService);
export { lobbyService };
