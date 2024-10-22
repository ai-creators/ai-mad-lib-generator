import { BaseEntity } from 'src/common/entities/base-entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdlibEntity } from '../../../adlib/infrastructure/entities/adlib.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false, unique: true, length: 50 })
  name: string;

  @ManyToMany(() => AdlibEntity, (adlib) => adlib.categories)
  adlibs: AdlibEntity[];
}
