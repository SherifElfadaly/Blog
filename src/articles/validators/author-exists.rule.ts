import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AuthorsRepository } from "src/authors/authors.repository";

@ValidatorConstraint({ name: 'AuthorExists', async: true })
@Injectable()
export class AuthorExistsRule implements ValidatorConstraintInterface {
  constructor(private authorsRepository: AuthorsRepository) {}

  async validate(value: number) {
    try {
      await this.authorsRepository.findOrFail(value);
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Author doesn't exist`;
  }
}