import { BaseFilters } from 'src/filters/base.filters';
import { Like } from 'typeorm';

export class ArticleTypeOrmFilters
  extends BaseFilters
  implements ArticleFiltersInterface
{
  setTitleCondition(value: string) {
    this.where['title'] = Like(`%${value}%`);
  }

  setAuthorIdCondition(value: string) {
    this.where['author_id'] = { id: value };
  }
}
