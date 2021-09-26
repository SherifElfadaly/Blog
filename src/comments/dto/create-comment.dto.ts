import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';
import { ArticleExistsRule } from '../validators/article-exists.rule';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsNumber()
  @Validate(ArticleExistsRule)
  article_id: number;
}
