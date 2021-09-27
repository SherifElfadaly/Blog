import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesRepository } from './articles.repository';
import { AuthorExistsRule } from './validators/author-exists.rule';
import { AuthorsModule } from '../authors/authors.module';
import { ArticleTypeOrmFilters } from './filters/article-typeorm.filters';
import { ArticleTypeOrmSorting } from './sorting/article-typeorm.sorting';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), AuthorsModule],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    ArticlesRepository,
    AuthorExistsRule,
    {
      provide: 'ArticleFiltersInterface',
      useClass: ArticleTypeOrmFilters,
    },
    {
      provide: 'ArticleSortingInterface',
      useClass: ArticleTypeOrmSorting,
    },
  ],
  exports: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}
