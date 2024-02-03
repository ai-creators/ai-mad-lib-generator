import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false, unique: true, length: 50 })
  name: string;

  @ManyToMany(() => Adlib, (adlib) => adlib.categories)
  adlibs: Adlib[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
