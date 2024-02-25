import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lobby, User } from 'src/data-model/entities';
import { Repository } from 'typeorm';
import { PlayersExceedLobbyCountException } from './exceptions/players-exceed-lobby-count.exception';
import { PlayerAlreadyInLobbyException } from './exceptions/player-already-in-lobby.exception';

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

  async addPlayerToLobby(lobby: Lobby, user: User) {
    if (!lobby.players) {
      lobby.players = [];
    }

    if (lobby.players.length === lobby.maxPlayers) {
      throw new PlayersExceedLobbyCountException();
    }

    if (lobby.players.find((player) => player.id === user.id)) {
      throw new PlayerAlreadyInLobbyException();
    }

    lobby.players.push(user);
    return this.lobbyRepository.save(lobby);
  }

  findOneByRoomCode(roomCode: string, relations: string[] = []) {
    if (!roomCode) {
      return null;
    }

    return this.lobbyRepository.findOne({
      where: {
        roomCode: roomCode.toUpperCase(),
      },
      relations,
    });
  }
}
