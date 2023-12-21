import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adlib } from './adlib.entity';
import { Comment } from './comment.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Adlib, (adlib) => adlib.reactions, { nullable: true })
  adlib: Adlib;

  @ManyToOne(() => Comment, (comment) => comment.reactions, { nullable: true })
  comment: Comment;
}
