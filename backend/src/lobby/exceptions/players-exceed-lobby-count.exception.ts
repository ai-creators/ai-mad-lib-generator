import { HttpException, HttpStatus } from '@nestjs/common';
import { LobbyLabel } from '../labels/lobby.label';

export class PlayersExceedLobbyCountException extends HttpException {
  constructor() {
    super(LobbyLabel.PLAYERS_EXCEED_LOBBY_COUNT, HttpStatus.CONFLICT);
  }
}
