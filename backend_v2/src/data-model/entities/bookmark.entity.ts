import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Adlib } from './adlib.entity';

@Entity()
export class Bookmark {
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

  @Column({ default: false })
  hasBookmarked: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
