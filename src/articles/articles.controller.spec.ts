import { Test, TestingModule } from '@nestjs/testing';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

describe('ArticlesController', () => {
  let articlesController: ArticlesController;
  let articlesService: ArticlesService;

  beforeEach(async () => {
    const paginationMeta = {
      itemCount: 0,
      totalItems: 0,
      itemsPerPage: 0,
      totalPages: 0,
      currentPage: 0,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ArticlesService,
          useFactory: () => ({
            create: jest.fn(
              (createArticleDto: CreateArticleDto): Promise<Article> =>
                Promise.resolve(new Article()),
            ),
            findAll: jest.fn(
              (page: string, limit: string): Promise<Pagination<Article>> =>
                Promise.resolve(new Pagination([], paginationMeta)),
            ),
            findOne: jest.fn(
              (id: number): Promise<Article> => Promise.resolve(new Article()),
            ),
            thumbsUp: jest.fn(
              (id: number): Promise<Article> => Promise.resolve(new Article()),
            ),
          }),
        },
      ],
      controllers: [ArticlesController],
    }).compile();

    articlesController = module.get<ArticlesController>(ArticlesController);
    articlesService = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(articlesController).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(articlesController.create).toBeDefined();
    });

    it('should call service create', async () => {
      const createArticleDto = new CreateArticleDto();
      await articlesController.create(createArticleDto);

      expect(articlesService.create).toHaveBeenCalledWith(createArticleDto);
    });

    it('should return article', async () => {
      const createArticleDto = new CreateArticleDto();
      const result = await articlesController.create(createArticleDto);

      expect(result as Article).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(articlesController.findAll).toBeDefined();
    });

    it('should call service findAll', async () => {
      await articlesController.findAll();

      expect(articlesService.findAll).toHaveBeenCalled();
    });

    it('should return articles with pagination object', async () => {
      const result = await articlesController.findAll();

      expect(result as Pagination<Article>).toBeTruthy();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(articlesController.findOne).toBeDefined();
    });

    it('should call service findOne', async () => {
      const id = '1';
      await articlesController.findOne(id);

      expect(articlesService.findOne).toHaveBeenCalledWith(+id);
    });

    it('should return article', async () => {
      const id = '1';
      const result = await articlesController.findOne(id);

      expect(result as Article).toBeTruthy();
    });
  });

  describe('thumbsUp', () => {
    it('should be defined', () => {
      expect(articlesController.thumbsUp).toBeDefined();
    });

    it('should call service findOne', async () => {
      const id = '1';
      await articlesController.thumbsUp(id);

      expect(articlesService.thumbsUp).toHaveBeenCalledWith(+id);
    });

    it('should return article', async () => {
      const id = '1';
      const result = await articlesController.thumbsUp(id);

      expect(result as Article).toBeTruthy();
    });
  });
});
