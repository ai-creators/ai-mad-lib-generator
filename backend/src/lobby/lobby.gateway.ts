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
import { HttpException, HttpStatus } from '@nestjs/common';

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

  @SubscribeMessage('leaveLobby')
  async handleLobbyLeave(
    @MessageBody() data: { roomCode: string; userId: number },
  ) {
    const { roomCode, userId } = data;

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const foundLobby = await this.lobbyService.findOneByRoomCode(roomCode, [
      'players',
    ]);
    if (!foundLobby) {
      throw new LobbyNotFoundException();
    }

    await this.lobbyService.removePlayerFromLobby(foundLobby, foundUser);

    const lobby = await this.lobbyService.findOneByRoomCode(roomCode, [
      'players',
    ]);
    this.server.to(roomCode).emit('playersUpdate', lobby.players ?? []);
  }

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
    if (!foundLobby) {
      throw new LobbyNotFoundException();
    }

    await this.lobbyService.addPlayerToLobby(foundLobby, foundUser);

    const lobby = await this.lobbyService.findOneByRoomCode(roomCode, [
      'players',
    ]);
    this.server.to(roomCode).emit('playersUpdate', lobby.players ?? []);
  }

  @SubscribeMessage('kickPlayer')
  async handleKickPlayer(
    @MessageBody() data: { roomCode: string; userId: number; creatorId },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomCode, userId, creatorId } = data;

    const foundUser = await this.userService.findUserById(userId);
    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const foundCreator = await this.userService.findUserById(creatorId);
    if (!foundUser) {
      throw new UserNotFoundException();
    }

    const foundLobby = await this.lobbyService.findOneByRoomCode(roomCode, [
      'players',
      'creator',
    ]);
    if (!foundLobby) {
      throw new LobbyNotFoundException();
    }

    if (foundLobby.creator.id !== foundCreator.id) {
      throw new HttpException(
        'Cannot be done as your not the creator of the lobby.',
        HttpStatus.CONFLICT,
      );
    }

    await this.lobbyService.removePlayerFromLobby(foundLobby, foundUser);

    const lobby = await this.lobbyService.findOneByRoomCode(roomCode, [
      'players',
    ]);
    this.server.to(roomCode).emit('playersUpdate', lobby.players ?? []);
  }
}
