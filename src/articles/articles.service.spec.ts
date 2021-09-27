import { Test, TestingModule } from '@nestjs/testing';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

describe('ArticlesService', () => {
  let articlesService: ArticlesService;
  let articlesRepository: ArticlesRepository;
  const paginationMeta = {
    itemCount: 0,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: ArticlesRepository,
          useFactory: () => ({
            create: jest.fn(
              (createArticleDto: CreateArticleDto): Promise<Article> =>
                Promise.resolve(new Article()),
            ),
            findAll: jest.fn(
              (options: IPaginationOptions): Promise<Pagination<Article>> =>
                Promise.resolve(new Pagination([], paginationMeta)),
            ),
            findOne: jest.fn(
              (id: number): Promise<Article> => Promise.resolve(new Article()),
            ),
            update: jest.fn((id: number) => {}),
          }),
        },
      ],
    }).compile();

    articlesService = module.get<ArticlesService>(ArticlesService);
    articlesRepository = module.get<ArticlesRepository>(ArticlesRepository);
  });

  it('should be defined', () => {
    expect(articlesService).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(articlesService.create).toBeDefined();
    });

    it('should call repository create', async () => {
      const createArticleDto = new CreateArticleDto();
      await articlesService.create(createArticleDto);

      expect(articlesRepository.create).toHaveBeenCalledWith(createArticleDto);
    });

    it('should return article', async () => {
      const createArticleDto = new CreateArticleDto();
      const result = await articlesService.create(createArticleDto);

      expect(result as Article).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(articlesService.findAll).toBeDefined();
    });

    it('should call repository findAll', async () => {
      await articlesService.findAll({ page: 1, limit: 1 });

      expect(articlesRepository.findAll).toHaveBeenCalled();
    });

    it('should return articles with pagination object', async () => {
      const result = await articlesService.findAll({ page: 1, limit: 1 });

      expect(result as Pagination<Article>).toBeTruthy();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(articlesService.findOne).toBeDefined();
    });

    it('should call repository findOne', async () => {
      const id = 1;
      await articlesService.findOne(id);

      expect(articlesRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should return article', async () => {
      const id = 1;
      const result = await articlesService.findOne(id);

      expect(result as Article).toBeTruthy();
    });
  });

  describe('thumbsUp', () => {
    it('should be defined', () => {
      expect(articlesService.thumbsUp).toBeDefined();
    });

    it('should call repository update', async () => {
      const id = 1;
      await articlesService.thumbsUp(id);

      expect(articlesRepository.update).toHaveBeenCalled();
    });

    it('should return article', async () => {
      const id = 1;
      const result = await articlesService.thumbsUp(id);

      expect(result as Article).toBeTruthy();
    });
  });
});
