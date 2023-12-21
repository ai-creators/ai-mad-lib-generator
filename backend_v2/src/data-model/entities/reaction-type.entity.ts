import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  content: string;
}
