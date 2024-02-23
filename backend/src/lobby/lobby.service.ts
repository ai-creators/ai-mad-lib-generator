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

  async createLobby(name: string, creatorId: number): Promise<Lobby> {
    const creator = await this.userRepository.findOneBy({ id: creatorId });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${creatorId} not found`);
    }
    const lobby = this.lobbyRepository.create({ name, creator });
    return this.lobbyRepository.save(lobby);
  }
}
