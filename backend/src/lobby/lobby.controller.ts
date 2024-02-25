import { Body, Controller, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { Lobby } from 'src/data-model/entities';

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
