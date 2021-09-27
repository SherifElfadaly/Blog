import { BaseSorting } from 'src/sorting/base.sorting';

export class ArticleTypeOrmSorting
  extends BaseSorting
  implements ArticleSortingInterface
{
  setThumbsUpSorting(sortColumn: string, sortDirection: string) {
    this.sort[sortColumn] = sortDirection;
  }
}
