import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { AuthorsRepository } from './authors.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    private authorsRepository: AuthorsRepository
  ) { }

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorsRepository.create(createAuthorDto);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Author>> {
    return this.authorsRepository.findAll(options);
  }

  findOne(id: number): Promise<Author | undefined> {
    return this.authorsRepository.findOne(id);
  }
}
