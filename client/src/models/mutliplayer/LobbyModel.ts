import { UserModel } from "../UserModel";
import { GameSessionModel } from "./GameSessionModel";

export interface LobbyModel {
  id: number;
  roomCode: string;
  creator: UserModel;
  players: UserModel[];
  maxPlayers: number;
  gameSessions: GameSessionModel[];
}
