import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { ContentRating } from 'src/data-model/models/ContentRating';

export class IsContentRatingTypeConstraint
  implements ValidatorConstraintInterface
{
  validate(feedType: any) {
    const values = Object.values(ContentRating);
    return values.includes(feedType);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${
      validationArguments.property
    } is not the allowed, the allowed content rating types are: ${Object.values(
      ContentRating,
    ).join(',')}`;
  }
}

export function IsContentRatingType(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsContentRatingTypeConstraint,
    });
  };
}
