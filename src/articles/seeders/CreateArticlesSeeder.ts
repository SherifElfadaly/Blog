import { Factory, Seeder } from 'typeorm-seeding';
import { Article } from '../entities/article.entity';

export default class CreateArticlesSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Article)().createMany(10);
  }
}
