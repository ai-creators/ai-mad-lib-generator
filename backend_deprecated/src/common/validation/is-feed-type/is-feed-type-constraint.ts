import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { FeedTypes } from 'src/models/feed-type';

export class IsFeedTypeConstraint implements ValidatorConstraintInterface {
  validate(feedType: any) {
    const values = Object.values(FeedTypes);
    return values.includes(feedType);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${
      validationArguments.property
    } is not the allowed, the allowed feed types are: ${Object.values(
      FeedTypes,
    ).join(',')}`;
  }
}

export function IsFeedType(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsFeedTypeConstraint,
    });
  };
}
