import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Comment } from '../entities/comment.entity';
import { Article } from 'src/articles/entities/article.entity';

define(Comment, (faker: typeof Faker) => {
  const comment = new Comment();
  comment.comment = faker.lorem.paragraph();
  comment.article = factory(Article)() as any;

  return comment;
});
