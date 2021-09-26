import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Validate } from 'class-validator';
import { AuthorExistsRule } from '../validators/author-exists.rule';

export class SearchArticleDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Validate(AuthorExistsRule)
  author_id: string;
}
