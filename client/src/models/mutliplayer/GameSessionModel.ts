import { LobbyModel } from "./LobbyModel";
import { RoundModel } from "./RoundModel";

export interface GameSessionModel {
  id: number;
  lobby: LobbyModel;
  rounds: RoundModel[];
}
