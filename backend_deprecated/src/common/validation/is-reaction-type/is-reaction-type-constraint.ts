import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ReactionType } from 'src/reaction/reaction-type';

export class IsReactionTypeConstraint implements ValidatorConstraintInterface {
  validate(feedType: any) {
    const values = Object.values(ReactionType);
    return values.includes(feedType);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${
      validationArguments.property
    } is not the allowed, the allowed reaction types are: ${Object.values(
      ReactionType,
    ).join(',')}`;
  }
}

export function IsReactionType(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsReactionTypeConstraint,
    });
  };
}
