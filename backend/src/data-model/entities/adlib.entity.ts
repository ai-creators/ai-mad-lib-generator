import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Adlib {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  prompt: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false, default: false })
  isHidden: boolean;

  @Column({ nullable: false, default: false })
  isPg: boolean;

  @Column({ nullable: false, default: false })
  isFeatured: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.7 })
  temperature: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 1 })
  topP: number;

  @ManyToMany(() => Category, (category) => category.adlibs)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
