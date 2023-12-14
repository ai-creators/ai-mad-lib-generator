import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  prompt: string;

  @Column({ nullable: false })
  body: string;
}
