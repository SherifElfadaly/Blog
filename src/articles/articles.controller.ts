import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiBody({
    type: CreateArticleDto,
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: String, required: false })
  @ApiQuery({ name: 'limit', type: String, required: false })
  findAll(
    @Query() query: SearchArticleDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Article>> {
    return this.articlesService.findAll({ page, limit }, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }
}
