import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { Author } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsRepository } from './authors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository],
  exports: [AuthorsService, AuthorsRepository],
})
export class AuthorsModule {}
