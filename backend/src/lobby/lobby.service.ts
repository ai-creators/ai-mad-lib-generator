import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lobby, User } from 'src/data-model/entities';
import { Repository } from 'typeorm';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private lobbyRepository: Repository<Lobby>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createLobby(creatorId: number, roomCode: string): Promise<Lobby> {
    const creator = await this.userRepository.findOneBy({ id: creatorId });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${creatorId} not found`);
    }
    const lobby = this.lobbyRepository.create({
      creator,
      roomCode: roomCode.toUpperCase(),
    });
    return this.lobbyRepository.save(lobby);
  }

  findOneByRoomCode(roomCode: string) {
    if (!roomCode) {
      return null;
    }

    return this.lobbyRepository.findOneBy({
      roomCode: roomCode.toUpperCase(),
    });
  }
}
