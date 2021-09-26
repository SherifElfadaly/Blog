import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Author } from '../entities/author.entity';

define(Author, (faker: typeof Faker) => {
  const athor = new Author();
  athor.name = faker.name.firstName() + ' ' + faker.name.lastName();
  athor.job_title = faker.name.jobTitle();

  return athor;
});
