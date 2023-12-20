import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, length: 50 })
  name: string;

  @ManyToMany(() => Adlib)
  @JoinTable()
  adlibs: Adlib[];
}
