import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from '../adlib.entity';
import { User } from './user.entity';
import { Submission } from './submission.entity';
import { GameSession } from './game-session.entity';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Adlib, (adlib) => adlib.rounds)
  adlib: Adlib;

  @OneToMany(() => User, (user) => user.judgeRounds)
  judge: User;

  @OneToMany(() => Submission, (submission) => submission.round, {
    cascade: true,
  })
  submissions: Submission[];

  @OneToOne(() => Submission, { nullable: true, cascade: true })
  @JoinColumn()
  winningSubmission: Submission | null;

  @ManyToOne(() => GameSession, (gameSession) => gameSession.rounds)
  gameSession: Promise<GameSession>;
}
