import { HttpException, HttpStatus } from '@nestjs/common';
import { LobbyLabel } from '../labels/lobby.label';

export class PlayerAlreadyInLobbyException extends HttpException {
  constructor() {
    super(LobbyLabel.PLAYER_ALREADY_IN_LOBBY, HttpStatus.CONFLICT);
  }
}
