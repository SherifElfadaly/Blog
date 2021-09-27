import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectRepository(Article)
    private articleRepository,
    @Inject('ArticleFiltersInterface')
    private articleFilters,
    @Inject('ArticleSortingInterface')
    private articleSorting,
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
    const where = this.articleFilters.constructWhereConditionsArray(conditions);
    const sort = this.articleSorting.constructSortArray(sortBy, sortDirection);
    const searchOptions = { where: where, order: sort };

    return paginate<Article>(this.articleRepository, options, searchOptions);
  }

  findOne(id: number): Promise<Article | undefined> {
    return this.articleRepository.findOne(id);
  }

  findOrFail(id: number): Promise<Article | undefined> {
    return this.articleRepository.findOneOrFail(id);
  }
}
