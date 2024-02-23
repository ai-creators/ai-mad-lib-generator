import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Round } from './round.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: true, length: 100 })
  guestName: string;

  @ManyToOne(() => Round, (round) => round.judge)
  judgeRounds: Promise<Round>;
}
