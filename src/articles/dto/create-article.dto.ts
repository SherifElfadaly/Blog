import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Validate } from "class-validator";
import { AuthorExistsRule } from "../validators/author-exists.rule";

export class CreateArticleDto {
    @ApiProperty()
    @IsString()
    title: string;
  
    @ApiProperty()
    @IsString()
    body: string;
  
    @ApiProperty()
    @IsNumber()
    @Validate(AuthorExistsRule)
    author_id: number;
}
