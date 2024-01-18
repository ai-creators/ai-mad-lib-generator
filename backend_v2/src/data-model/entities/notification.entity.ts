import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { Account } from './account.entity';
import { NotificationType } from 'src/notification/notification-type';
import { NotificationStatus } from 'src/notification/notification-status';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Adlib, (adlib) => adlib.notifications)
  adlib: Adlib;

  @ManyToOne(() => Account, (account) => account.notifications)
  account: Account;

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: false,
  })
  type: NotificationType;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.HIDDEN,
  })
  status: NotificationStatus;

  @ManyToOne(() => Account, (account) => account.createdNotifications)
  createdBy: Account;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
