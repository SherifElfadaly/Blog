import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleExistsRule } from './validators/article-exists.rule';
import { ArticlesModule } from 'src/articles/articles.module';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticlesModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, ArticleExistsRule],
})
export class CommentsModule {}
