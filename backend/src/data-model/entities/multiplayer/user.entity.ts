import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Round } from './round.entity';
import { Submission } from './submission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: true, length: 100 })
  guestName: string;

  @ManyToOne(() => Round, (round) => round.judge)
  judgeRounds: Promise<Round>;

  @OneToMany(() => Submission, (submission) => submission.creator)
  submissions: Promise<Submission[]>;

  public asObject() {
    return {
      guestName: this.guestName,
    };
  }
}
