import {
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { AdlibResponseQuestion } from './adlib-response-question.entity';

@Entity()
export class AdlibResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Adlib, (adlib) => adlib.adlibResponses)
  adlib: Adlib;

  @OneToMany(
    () => AdlibResponseQuestion,
    (adlibResponseQuestion) => adlibResponseQuestion.adlibResponse,
  )
  @JoinTable()
  questions: AdlibResponseQuestion[];
}
