import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AuthorsRepository } from './authors.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

describe('authorsRepository', () => {
  let authorsRepository: AuthorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsRepository,
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
      ],
    }).compile();

    authorsRepository = module.get<AuthorsRepository>(AuthorsRepository);
  });

  it('should be defined', () => {
    expect(authorsRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(authorsRepository.create).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(authorsRepository.findAll).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(authorsRepository.findOne).toBeDefined();
    });
  });

  describe('findOrFail', () => {
    it('should be defined', () => {
      expect(authorsRepository.findOrFail).toBeDefined();
    });
  });
});
