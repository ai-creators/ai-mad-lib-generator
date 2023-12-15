import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Category } from './category.entity';
@Entity()
export class Adlib {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  prompt: string;

  @Column({ nullable: false, length: 200 })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ default: false })
  isPg: boolean;

  @ManyToOne(() => Account, (account) => account.adlibs)
  @JoinTable()
  createdBy: Account;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
