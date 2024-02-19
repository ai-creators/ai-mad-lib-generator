import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false, unique: true })
  sub: string;

  @Column({ nullable: false, unique: true, length: 100 })
  username: string;

  @OneToMany(() => Adlib, (adlib) => adlib.createdBy)
  adlibs: Promise<Adlib>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
