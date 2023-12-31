import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReactionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  content: string;
}
