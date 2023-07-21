import { Properties } from "../ts/Interfaces/Properties";

export interface Validator {
  validate(data: Properties): boolean;

  addToInvalidProperties(property: { label: string; message: string }): void;

  getInvalidPropertiesAsString(): string;

  getFormattedInvalidProperties(): string;

  resetInvalidProperties(): void;
}
