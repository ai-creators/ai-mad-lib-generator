import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdlibResponse } from './adlib-response.entity';

@Entity()
export class AdlibResponseQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AdlibResponse, (adlibResponse) => adlibResponse.questions)
  @JoinTable()
  adlibResponse: AdlibResponse;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: false })
  answer: string;
}
