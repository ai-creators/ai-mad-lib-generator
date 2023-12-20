import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { Account } from './account.entity';
import { AdlibResponseQuestion } from './adlib-response-question.entity';

@Entity()
export class AdlibResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  oldAdlibResponseId: string;

  @ManyToOne(() => Adlib, (adlib) => adlib.adlibResponses)
  @JoinTable()
  adlib: Adlib;

  @OneToMany(
    () => AdlibResponseQuestion,
    (adlibResponseQuestion) => adlibResponseQuestion.adlibResponse,
    {
      cascade: true,
    },
  )
  questions: AdlibResponseQuestion[];

  @ManyToOne(() => Account, (account) => account.adlibResponses)
  createdBy: Account;
}
