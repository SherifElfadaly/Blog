import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ArticlesRepository } from './articles.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(private articlesRepository: ArticlesRepository) {}

  create(createArticleDto: CreateArticleDto) {
    return this.articlesRepository.create(createArticleDto);
  }

  findAll(
    options: IPaginationOptions,
    conditions?: SearchArticleDto,
    sortBy?: string,
    sortDirection?: string,
  ): Promise<Pagination<Article>> {
    return this.articlesRepository.findAll(
      options,
      conditions,
      sortBy,
      sortDirection,
    );
  }

  findOne(id: number): Promise<Article | undefined> {
    return this.articlesRepository.findOne(id);
  }

  async thumbsUp(id: number) {
    const article = await this.findOne(id);

    // TODO: prevent user from thumbs_up multiple times

    await this.articlesRepository.update(id, {
      thumbs_up: ++article.thumbs_up,
    });

    return article;
  }
}
