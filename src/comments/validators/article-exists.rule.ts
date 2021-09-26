import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ArticlesRepository } from "src/articles/articles.repository";

@ValidatorConstraint({ name: 'ArticleExists', async: true })
@Injectable()
export class ArticleExistsRule implements ValidatorConstraintInterface {
  constructor(private articlesRepository: ArticlesRepository) {}

  async validate(value: number) {
    try {
      await this.articlesRepository.findOrFail(value);
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Article doesn't exist`;
  }
}