import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { AdlibResponse } from './adlib-response.entity';
import { Bookmark } from './bookmark.entity';
import { Notification } from './notification.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  sub: string;

  @Column({ nullable: false, unique: true, length: 100 })
  username: string;

  @Column({ nullable: false, default: false })
  usePg: boolean;

  @OneToMany(() => Adlib, (adlib) => adlib.createdBy)
  adlibs: Adlib[];

  @OneToMany(() => AdlibResponse, (adlibResponse) => adlibResponse.createdBy)
  adlibResponses: AdlibResponse[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.account)
  bookmarks: Promise<Bookmark[]>;

  @OneToMany(() => Notification, (notification) => notification.account)
  notifications: Promise<Notification[]>;

  @OneToMany(() => Notification, (notification) => notification.createdBy)
  createdNotifications: Promise<Notification[]>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
