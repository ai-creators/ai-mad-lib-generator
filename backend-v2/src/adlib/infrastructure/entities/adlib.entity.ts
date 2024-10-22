import { Id } from 'src/common/domain/id';
import { BaseEntity } from 'src/common/entities/base-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('adlib')
export class AdlibEntity extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: true, unique: true, length: 24 })
  oldId: string;

  @Column({ nullable: false, length: 200 })
  title: string;

  @Column({ nullable: false, length: 100 })
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

  @ManyToMany(() => CategoryEntity, (category) => category.adlibs)
  @JoinTable()
  categories: CategoryEntity[];
}
