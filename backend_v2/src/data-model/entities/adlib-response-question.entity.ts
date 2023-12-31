import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdlibResponse } from './adlib-response.entity';

@Entity()
export class AdlibResponseQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: false })
  answer: string;

  @ManyToOne(() => AdlibResponse, (adlibResponse) => adlibResponse.questions)
  adlibResponse: AdlibResponse;
}
