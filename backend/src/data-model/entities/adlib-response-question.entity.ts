import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdlibResponse } from './adlib-response.entity';

@Entity()
export class AdlibResponseQuestion {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: false })
  answer: string;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => AdlibResponse, (adlibResponse) => adlibResponse.questions)
  adlibResponse: AdlibResponse;
}
