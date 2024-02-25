import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { Lobby } from 'src/data-model/entities';
import { LobbyNotFoundException } from './exceptions/lobby-not-found.exception';

@Controller('/v1/lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post()
  async createLobby(
    @Body()
    createLobbyDto: CreateLobbyDto,
  ): Promise<Lobby> {
    return this.lobbyService.createLobby(
      createLobbyDto.userId,
      await this.generateUniqueRoomCode(),
    );
  }

  @Get('/find/room-code')
  async findLobbyByRoomCode(
    @Query()
    { roomCode },
  ): Promise<Lobby> {
    if (!roomCode) {
      throw new LobbyNotFoundException();
    }

    const foundLobby = await this.lobbyService.findOneByRoomCode(roomCode);

    if (!foundLobby) {
      throw new LobbyNotFoundException();
    }

    return foundLobby;
  }

  private async generateUniqueRoomCode(): Promise<string> {
    let isUnique = false;
    let uniqueCode = '';
    while (!isUnique) {
      // Generate a code of 6 characters length, mixing uppercase letters and numbers
      uniqueCode = (Math.random().toString(36) + '000000')
        .substring(2, 8)
        .toUpperCase();

      const existingLobby =
        await this.lobbyService.findOneByRoomCode(uniqueCode);
      if (!existingLobby) {
        isUnique = true;
      }
    }
    return uniqueCode;
  }
}
