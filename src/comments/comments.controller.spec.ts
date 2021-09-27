import { Test, TestingModule } from '@nestjs/testing';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

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
          provide: CommentsService,
          useFactory: () => ({
            create: jest.fn(
              (createCommentDto: CreateCommentDto): Promise<Comment> =>
                Promise.resolve(new Comment()),
            ),
            findAll: jest.fn(
              (page: string, limit: string): Promise<Pagination<Comment>> =>
                Promise.resolve(new Pagination([], paginationMeta)),
            ),
            findOne: jest.fn(
              (id: number): Promise<Comment> => Promise.resolve(new Comment()),
            ),
          }),
        },
      ],
      controllers: [CommentsController],
    }).compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(commentsController).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(commentsController.create).toBeDefined();
    });

    it('should call service create', async () => {
      const createCommentDto = new CreateCommentDto();
      await commentsController.create(createCommentDto);

      expect(commentsService.create).toHaveBeenCalledWith(createCommentDto);
    });

    it('should return comment', async () => {
      const createCommentDto = new CreateCommentDto();
      const result = await commentsController.create(createCommentDto);

      expect(result as Comment).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(commentsController.findAll).toBeDefined();
    });

    it('should call service findAll', async () => {
      await commentsController.findAll();

      expect(commentsService.findAll).toHaveBeenCalled();
    });

    it('should return comments with pagination object', async () => {
      const result = await commentsController.findAll();

      expect(result as Pagination<Comment>).toBeTruthy();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(commentsController.findOne).toBeDefined();
    });

    it('should call service findOne', async () => {
      const id = '1';
      await commentsController.findOne(id);

      expect(commentsService.findOne).toHaveBeenCalledWith(+id);
    });

    it('should return comment', async () => {
      const id = '1';
      const result = await commentsController.findOne(id);

      expect(result as Comment).toBeTruthy();
    });
  });
});
