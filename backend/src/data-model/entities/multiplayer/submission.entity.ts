import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdlibResponse } from '../adlib-response.entity';
import { Round } from './round.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AdlibResponse, (adlibResponse) => adlibResponse.submissions)
  response: AdlibResponse;

  @ManyToOne(() => Round, (round) => round.submissions)
  round: Round;
}
