import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Category } from './category.entity';
import { AdlibResponse } from './adlib-response.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
import { Bookmark } from './bookmark.entity';
@Entity()
export class Adlib {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  oldAdlibId: string;

  @Column({ nullable: false, length: 100 })
  prompt: string;

  @Column({ nullable: false, length: 200 })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ default: false })
  isPg: boolean;

  @Column({ nullable: true })
  temperature: number;

  @Column({ nullable: true })
  topP: number;

  @Column({ default: false })
  isFeatured: boolean;

  @ManyToOne(() => Account, (account) => account.adlibs)
  @JoinTable()
  createdBy: Promise<Account>;

  @ManyToMany(() => Category, (category) => category.adlibs)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => AdlibResponse, (adlibResponse) => adlibResponse.adlib)
  adlibResponses: Promise<AdlibResponse[]>;

  @ManyToOne(() => Comment, (comment) => comment.adlib)
  comments: Promise<Comment[]>;

  @OneToMany(() => Reaction, (reaction) => reaction.adlib)
  reactions: Promise<Reaction[]>;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.adlib)
  bookmarks: Promise<Bookmark[]>;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
