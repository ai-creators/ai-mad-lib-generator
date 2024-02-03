import {
  Column,
  CreateDateColumn,
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isHidden: boolean;

  @ManyToOne(() => Account, (account) => account.adlibResponses)
  createdBy: Account;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  public sortQuestions(): void {
    this.questions.sort((a, b) => {
      return a.order - b.order;
    });
  }
}
