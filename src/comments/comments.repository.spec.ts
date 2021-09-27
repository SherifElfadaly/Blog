import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CommentsRepository } from './comments.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

describe('commentsRepository', () => {
  let commentsRepository: CommentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsRepository,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    commentsRepository = module.get<CommentsRepository>(CommentsRepository);
  });

  it('should be defined', () => {
    expect(commentsRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(commentsRepository.create).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(commentsRepository.findAll).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(commentsRepository.findOne).toBeDefined();
    });
  });

  describe('findOrFail', () => {
    it('should be defined', () => {
      expect(commentsRepository.findOrFail).toBeDefined();
    });
  });
});
