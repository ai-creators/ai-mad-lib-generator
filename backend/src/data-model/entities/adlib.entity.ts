import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { AdlibResponse } from './adlib-response.entity';
import { Account } from './account.entity';

@Entity()
export class Adlib {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: true, unique: true, length: 24 })
  oldId: string;

  @Column({ nullable: false, length: 200 })
  title: string;

  @Column({ nullable: false, length: 100 })
  prompt: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false, default: false })
  isHidden: boolean;

  @Column({ nullable: false, default: false })
  isPg: boolean;

  @Column({ nullable: false, default: false })
  isFeatured: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.7 })
  temperature: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 1 })
  topP: number;

  @ManyToMany(() => Category, (category) => category.adlibs)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => AdlibResponse, (AdlibResponse) => AdlibResponse.adlib)
  adlibResponses: Promise<AdlibResponse[]>;

  @ManyToOne(() => Account, (account) => account.adlibs)
  createdBy: Account;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
