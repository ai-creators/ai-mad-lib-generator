import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Category } from './category.entity';
import { AdlibResponse } from './adlib-response.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
@Entity()
export class Adlib {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  oldAdlibId: string;

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

  @OneToMany(() => AdlibResponse, (adlibResponse) => adlibResponse.adlib)
  adlibResponses: AdlibResponse[];

  @ManyToOne(() => Comment, (comment) => comment.adlib)
  comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.adlib)
  reactions: Reaction[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
