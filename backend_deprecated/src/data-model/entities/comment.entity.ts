import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adlib } from './adlib.entity';
import { Reaction } from './reaction.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 280 })
  content: string;

  @ManyToOne(() => Adlib, (adlib) => adlib.comments)
  adlib: Adlib;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.childComments, {
    nullable: true,
  })
  parentComment: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.adlib)
  reactions: Reaction[];
}
