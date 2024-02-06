import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { ReactionType } from 'src/reaction/reaction-type';
import { Account } from './account.entity';

@Entity()
export class Reaction {
  @PrimaryColumn()
  accountId: string;

  @PrimaryColumn()
  adlibId: string;

  @ManyToOne(() => Account, (account) => account.bookmarks)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @ManyToOne(() => Adlib, (adlib) => adlib.bookmarks)
  @JoinColumn({ name: 'adlibId' })
  adlib: Adlib;

  @Column({
    type: 'enum',
    enum: ReactionType,
    default: ReactionType.LIKE,
  })
  reactionType: ReactionType;

  @Column({ default: false })
  hasReacted: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
