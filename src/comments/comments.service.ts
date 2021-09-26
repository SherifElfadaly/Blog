import { Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository
  ) { }

  create(createCommentDto: CreateCommentDto) {
    return this.commentsRepository.create(createCommentDto);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Comment>> {
    return this.commentsRepository.findAll(options);
  }

  findOne(id: number): Promise<Comment | undefined> {
    return this.commentsRepository.findOne(id);
  }
}
