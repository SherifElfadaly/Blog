import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Article } from '../entities/article.entity';
import { Author } from '../..//authors/entities/author.entity';

define(Article, (faker: typeof Faker) => {
  const article = new Article();
  article.title = faker.lorem.word();
  article.body = faker.lorem.paragraph();
  article.thumbs_up = faker.datatype.number();
  article.author = factory(Author)() as any;

  return article;
});
