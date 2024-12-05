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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  oldId?: number;

  @Column({ nullable: false, length: 200 })
  title: string;

  @Column({ nullable: false, length: 100 })
  prompt: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: true, default: false })
  isHidden?: boolean;

  @Column({ nullable: true, default: false })
  isPg?: boolean;

  @Column({ nullable: true, default: false })
  isFeatured?: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.7 })
  temperature: number;

  @ManyToMany(() => CategoryEntity, (category) => category.adlibs)
  @JoinTable()
  categories: CategoryEntity[];
}
