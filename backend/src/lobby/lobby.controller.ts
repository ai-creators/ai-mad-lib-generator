import { Body, Controller, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { Lobby } from 'src/data-model/entities';

@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post()
  createLobby(
    @Body()
    createLobbyDto: CreateLobbyDto,
  ): Promise<Lobby> {
    return this.lobbyService.createLobby(
      createLobbyDto.name,
      createLobbyDto.userId,
    );
  }
}
