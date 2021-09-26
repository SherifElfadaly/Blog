import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreateArticleDto } from "./create-article.dto";

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    thumbs_up: number;
}
