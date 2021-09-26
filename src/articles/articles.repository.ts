import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectRepository(Article)
    private articleRepository,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  findAll(
    options: IPaginationOptions,
    conditions?: SearchArticleDto,
    sortBy?: string,
    sortDirection?: string,
  ): Promise<Pagination<Article>> {
    /**
     * TODO: Implment more generic way for filtring and sorting
     * for example use builder pattern to build
     * the conditions and sorting array.
     */
    const where = this.constructWhereConditionsArray(conditions);
    const sort = this.constructSortArray(sortBy, sortDirection);
    const searchOptions = { where: where, order: sort };

    return paginate<Article>(this.articleRepository, options, searchOptions);
  }

  findOne(id: number): Promise<Article | undefined> {
    return this.articleRepository.findOne(id);
  }

  findOrFail(id: number): Promise<Article | undefined> {
    return this.articleRepository.findOneOrFail(id);
  }

  private constructSortArray(sortBy: string, sortDirection = 'ASC') {
    const sort = {};
    switch (sortBy) {
      case 'thumbs_up':
        sort['thumbs_up'] = sortDirection;
        break;

      default:
        break;
    }

    return sort;
  }

  private constructWhereConditionsArray(conditions: SearchArticleDto) {
    const where = {};
    for (const key in conditions) {
      if (Object.prototype.hasOwnProperty.call(conditions, key)) {
        const element = conditions[key];
        switch (key) {
          case 'author_id':
            where['author'] = { id: element };
            break;
          case 'title':
            where['title'] = Like(`%${element}%`);
            break;

          default:
            break;
        }
      }
    }

    return where;
  }
}
