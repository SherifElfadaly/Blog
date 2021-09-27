import { Test, TestingModule } from '@nestjs/testing';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let commentsRepository: CommentsRepository;
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
        CommentsService,
        {
          provide: CommentsRepository,
          useFactory: () => ({
            create: jest.fn(
              (createCommentDto: CreateCommentDto): Promise<Comment> =>
                Promise.resolve(new Comment()),
            ),
            findAll: jest.fn(
              (options: IPaginationOptions): Promise<Pagination<Comment>> =>
                Promise.resolve(new Pagination([], paginationMeta)),
            ),
            findOne: jest.fn(
              (id: number): Promise<Comment> => Promise.resolve(new Comment()),
            ),
          }),
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get<CommentsRepository>(CommentsRepository);
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(commentsService.create).toBeDefined();
    });

    it('should call repository create', async () => {
      const createCommentDto = new CreateCommentDto();
      await commentsService.create(createCommentDto);

      expect(commentsRepository.create).toHaveBeenCalledWith(createCommentDto);
    });

    it('should return comment', async () => {
      const createCommentDto = new CreateCommentDto();
      const result = await commentsService.create(createCommentDto);

      expect(result as Comment).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(commentsService.findAll).toBeDefined();
    });

    it('should call repository findAll', async () => {
      await commentsService.findAll({ page: 1, limit: 1 });

      expect(commentsRepository.findAll).toHaveBeenCalled();
    });

    it('should return comments with pagination object', async () => {
      const result = await commentsService.findAll({ page: 1, limit: 1 });

      expect(result as Pagination<Comment>).toBeTruthy();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(commentsService.findOne).toBeDefined();
    });

    it('should call repository findOne', async () => {
      const id = 1;
      await commentsService.findOne(id);

      expect(commentsRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should return comment', async () => {
      const id = 1;
      const result = await commentsService.findOne(id);

      expect(result as Comment).toBeTruthy();
    });
  });
});
