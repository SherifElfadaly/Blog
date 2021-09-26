import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from '../../articles/entities/article.entity';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  job_title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article;
}
