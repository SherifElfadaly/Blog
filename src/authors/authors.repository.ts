import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsRepository {
  constructor(
    @InjectRepository(Author)
    private authorRepository,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Author>> {
    return paginate<Author>(this.authorRepository, options);
  }

  findOne(id: number): Promise<Author | undefined> {
    return this.authorRepository.findOne(id);
  }

  findOrFail(id: number): Promise<Author | undefined> {
    return this.authorRepository.findOneOrFail(id);
  }
}
