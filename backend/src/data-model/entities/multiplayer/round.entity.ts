import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from '../adlib.entity';
import { User } from './user.entity';
import { Submission } from './submission.entity';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Adlib, (adlib) => adlib.rounds)
  adlib: Adlib;

  @OneToMany(() => User, (user) => user.judgeRounds)
  judge: User;

  @OneToMany(() => Submission, (submission) => submission.round)
  submissions: Submission[];

  @OneToOne(() => Submission, { nullable: true })
  @JoinColumn()
  winningSubmission: Submission | null;
}
