import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ArticlesRepository } from './articles.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

describe('articlesRepository', () => {
  let articlesRepository: ArticlesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesRepository,
        {
          provide: getRepositoryToken(Article),
          useClass: Repository,
        },
        {
          provide: 'ArticleFiltersInterface',
          useFactory: () => ({
            setTitleCondition: jest.fn((value: string) => {}),
            setAuthorIdCondition: jest.fn((value: string) => {}),
          }),
        },
        {
          provide: 'ArticleSortingInterface',
          useFactory: () => ({
            setThumbsUpSorting: jest.fn(
              (sortColumn: string, sortDirection: string) => {},
            ),
          }),
        },
      ],
    }).compile();

    articlesRepository = module.get<ArticlesRepository>(ArticlesRepository);
  });

  it('should be defined', () => {
    expect(articlesRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(articlesRepository.create).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(articlesRepository.findAll).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(articlesRepository.findOne).toBeDefined();
    });
  });

  describe('findOrFail', () => {
    it('should be defined', () => {
      expect(articlesRepository.findOrFail).toBeDefined();
    });
  });
});
