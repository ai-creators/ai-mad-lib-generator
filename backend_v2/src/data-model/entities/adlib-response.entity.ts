import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { AdlibResponseQuestion } from './adlib-response-question.entity';
import { Account } from './account.entity';

@Entity()
export class AdlibResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  oldAdlibResponseId: string;

  @ManyToOne(() => Adlib, (adlib) => adlib.adlibResponses)
  adlib: Adlib;

  @OneToMany(
    () => AdlibResponseQuestion,
    (adlibResponseQuestion) => adlibResponseQuestion.adlibResponse,
  )
  @JoinTable()
  questions: AdlibResponseQuestion[];

  @ManyToOne(() => Account, (account) => account.adlibResponses)
  createdBy: Account;
}
