import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private commentRepository
  ) { }

  create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Comment>> {
    return paginate<Comment>(this.commentRepository, options);
  }

  findOne(id: number): Promise<Comment | undefined> {
    return this.commentRepository.findOne(id);
  }

  findOrFail(id: number): Promise<Comment | undefined> {
    return this.commentRepository.findOneOrFail(id);
  }
}
