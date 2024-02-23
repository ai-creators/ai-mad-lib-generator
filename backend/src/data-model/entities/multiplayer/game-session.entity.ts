import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lobby } from './lobby.entity';

@Entity()
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lobby, (lobby) => lobby.gameSessions)
  lobby: Lobby;
}
