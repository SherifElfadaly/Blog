import { Test, TestingModule } from '@nestjs/testing';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { AuthorsRepository } from './authors.repository';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

describe('AuthorsService', () => {
  let authorsService: AuthorsService;
  let authorsRepository: AuthorsRepository;
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
        AuthorsService,
        {
          provide: AuthorsRepository,
          useFactory: () => ({
            create: jest.fn(
              (createAuthorDto: CreateAuthorDto): Promise<Author> =>
                Promise.resolve(new Author()),
            ),
            findAll: jest.fn(
              (options: IPaginationOptions): Promise<Pagination<Author>> =>
                Promise.resolve(new Pagination([], paginationMeta)),
            ),
            findOne: jest.fn(
              (id: number): Promise<Author> => Promise.resolve(new Author()),
            ),
          }),
        },
      ],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    authorsRepository = module.get<AuthorsRepository>(AuthorsRepository);
  });

  it('should be defined', () => {
    expect(authorsService).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(authorsService.create).toBeDefined();
    });

    it('should call repository create', async () => {
      const createAuthorDto = new CreateAuthorDto();
      await authorsService.create(createAuthorDto);

      expect(authorsRepository.create).toHaveBeenCalledWith(createAuthorDto);
    });

    it('should return author', async () => {
      const createAuthorDto = new CreateAuthorDto();
      const result = await authorsService.create(createAuthorDto);

      expect(result as Author).toBeTruthy();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(authorsService.findAll).toBeDefined();
    });

    it('should call repository findAll', async () => {
      await authorsService.findAll({ page: 1, limit: 1 });

      expect(authorsRepository.findAll).toHaveBeenCalled();
    });

    it('should return authors with pagination object', async () => {
      const result = await authorsService.findAll({ page: 1, limit: 1 });

      expect(result as Pagination<Author>).toBeTruthy();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(authorsService.findOne).toBeDefined();
    });

    it('should call repository findOne', async () => {
      const id = 1;
      await authorsService.findOne(id);

      expect(authorsRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should return author', async () => {
      const id = 1;
      const result = await authorsService.findOne(id);

      expect(result as Author).toBeTruthy();
    });
  });
});
