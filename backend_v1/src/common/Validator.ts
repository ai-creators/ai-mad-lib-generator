import { Properties } from "../ts/Interfaces/Properties";

export interface Validator {
  validate(data: Properties): boolean;

  getInvalidPropertiesAsString(): string;

  getFormattedInvalidProperties(): string;

  resetInvalidProperties(): void;
}
