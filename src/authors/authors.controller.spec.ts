import { Test, TestingModule } from '@nestjs/testing';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

describe('AuthorsController', () => {
  let authorsController: AuthorsController;
  let authorsService: AuthorsService;

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
          provide: AuthorsService,
          useFactory: () => ({
            create: jest.fn(
              (createAuthorDto: CreateAuthorDto): Promise<Author> =>
                Promise.resolve(new Author()),
            ),
            findAll: jest.fn(
              (page: string, limit: string): Promise<Pagination<Author>> =>
                Promise.resolve(new Pagination([], paginationMeta)),
            ),
            findOne: jest.fn(
              (id: number): Promise<Author> => Promise.resolve(new Author()),
            ),
          }),
        },
      ],
      controllers: [AuthorsController],
    }).compile();

    authorsController = module.get<AuthorsController>(AuthorsController);
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(authorsController).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(authorsController.create).toBeDefined();
    });

    it('should call service create', async () => {
      const createAuthorDto = new CreateAuthorDto();
      await authorsController.create(createAuthorDto);

      expect(authorsService.create).toHaveBeenCalledWith(createAuthorDto);
    });

    it('should return author', async () => {
      const createAuthorDto = new CreateAuthorDto();
      const result = await authorsController.create(createAuthorDto);

      expect(result as Author).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(authorsController.findAll).toBeDefined();
    });

    it('should call service findAll', async () => {
      await authorsController.findAll();

      expect(authorsService.findAll).toHaveBeenCalled();
    });

    it('should return authors with pagination object', async () => {
      const result = await authorsController.findAll();

      expect(result as Pagination<Author>).toBeTruthy();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(authorsController.findOne).toBeDefined();
    });

    it('should call service findOne', async () => {
      const id = '1';
      await authorsController.findOne(id);

      expect(authorsService.findOne).toHaveBeenCalledWith(+id);
    });

    it('should return author', async () => {
      const id = '1';
      const result = await authorsController.findOne(id);

      expect(result as Author).toBeTruthy();
    });
  });
});
