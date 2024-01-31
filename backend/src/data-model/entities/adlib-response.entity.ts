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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
