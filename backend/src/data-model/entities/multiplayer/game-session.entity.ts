import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lobby } from './lobby.entity';
import { Round } from './round.entity';

@Entity()
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lobby, (lobby) => lobby.gameSessions)
  lobby: Lobby;

  @OneToMany(() => Round, (round) => round.gameSession, {
    cascade: true,
  })
  rounds: Round[];
}
