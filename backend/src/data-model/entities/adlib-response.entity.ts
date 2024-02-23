import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { AdlibResponseQuestion } from './adlib-response-question.entity';
import { Submission } from './multiplayer/submission.entity';

@Entity()
export class AdlibResponse {
  @PrimaryGeneratedColumn('identity')
  id: number;

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

  @ManyToOne(() => Submission, (submission) => submission.response)
  submissions: Promise<Submission>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  public sortQuestions(): void {
    this.questions.sort((a, b) => {
      return a.order - b.order;
    });
  }
}
