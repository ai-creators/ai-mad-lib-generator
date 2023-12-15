import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sub: string;

  @Column({ nullable: false, unique: true, length: 100 })
  username: string;

  @Column({ nullable: false, default: false })
  usePg: boolean;

  @OneToMany(() => Adlib, (adlib) => adlib.createdBy)
  adlibs: Adlib[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
