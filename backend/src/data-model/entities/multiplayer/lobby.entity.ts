import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { GameSession } from './game-session.entity';
import { User } from './user.entity';

@Entity()
@Unique(['roomCode'])
export class Lobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, length: 6 })
  roomCode: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToMany(() => User, {
    cascade: ['update', 'insert'],
  })
  @JoinTable()
  players: User[];

  @Column({ default: 10 })
  maxPlayers: number = 10;

  @OneToMany(() => GameSession, (gameSession) => gameSession.lobby, {
    cascade: true,
  })
  gameSessions: GameSession[];
}
