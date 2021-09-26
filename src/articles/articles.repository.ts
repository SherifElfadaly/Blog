import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectRepository(Article)
    private articleRepository
  ) { }

  create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  findAll(
    options: IPaginationOptions,
    conditions?: SearchArticleDto,
  ): Promise<Pagination<Article>> {
    const where = this.constructWhereConditionsArray(conditions);
    return paginate<Article>(this.articleRepository, options, {
      where: where,
    });
  }

  findOne(id: number): Promise<Article | undefined> {
    return this.articleRepository.findOne(id);
  }

  findOrFail(id: number): Promise<Article | undefined> {
    return this.articleRepository.findOneOrFail(id);
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
