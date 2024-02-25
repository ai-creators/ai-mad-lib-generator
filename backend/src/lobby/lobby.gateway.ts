import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyService } from './lobby.service';
import { UserService } from 'src/user/user.service';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { LobbyNotFoundException } from './exceptions/lobby-not-found.exception';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LobbyGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private lobbyService: LobbyService,
    private userService: UserService,
  ) {}

  @SubscribeMessage('joinLobby')
  async handleLobbyJoin(
    @MessageBody() data: { roomCode: string; userId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomCode, userId } = data;
    client.join(roomCode);

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const foundLobby = await this.lobbyService.findOneByRoomCode(roomCode, [
      'players',
    ]);
    console.log(foundLobby);
    if (!foundLobby) {
      throw new LobbyNotFoundException();
    }

    await this.lobbyService.addPlayerToLobby(foundLobby, foundUser);

    const lobby = await this.lobbyService.findOneByRoomCode(roomCode, [
      'players',
    ]);
    console.log('RESPONSE FINAL: ', lobby);
    this.server.to(roomCode).emit('playersUpdate', lobby.players ?? []);
  }
}
