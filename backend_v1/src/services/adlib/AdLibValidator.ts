import { Validator } from "../../common/Validator";
import { AdLibProps } from "../../ts/types/AdLibProps";

export class AdLibValidator implements Validator {
  constructor() {
    this.invalidProperties = [];
  }

  public validate(data: AdLibProps): boolean {
    this.validateTimestamp(data.timestamp);
    this.validatePage(data.page);
    this.validatePagination(data.pagination);
    return this.invalidProperties.length === 0;
  }

  private validateTimestamp(timestamp: Date): void {
    const invalidObject: { label: string; message: string } = {
      label: "timestamp",
      message: "",
    };
    if (!timestamp) {
      invalidObject.message = "No timestamp provided";
      this.addToInvalidProperties(invalidObject);
      return;
    }
    if (timestamp instanceof Date && isNaN(timestamp.getTime())) {
      invalidObject.message = "Timestamp is not a valid date";
      this.addToInvalidProperties(invalidObject);
      return;
    }
    const currentTime = new Date();
    if (currentTime < timestamp) {
      invalidObject.message = "Timestamp is in the future";
      this.addToInvalidProperties(invalidObject);
      return;
    }
  }

  private validatePage(page: number): void {
    const invalidObject: { label: string; message: string } = {
      label: "page",
      message: "",
    };
    if (!page || page <= 0) {
      invalidObject.message = `Page is not defined or is less than 0`;
      this.addToInvalidProperties(invalidObject);
      return;
    }
  }

  private validatePagination(pagination: number): void {
    const invalidObject: { label: string; message: string } = {
      label: "pagination",
      message: "",
    };
    if (!pagination || pagination <= 0) {
      invalidObject.message = `Pagination is not defined or is less than 0`;
      this.addToInvalidProperties(invalidObject);
      return;
    }
    if (pagination > AdLibValidator.MAX_PAGINATION) {
      invalidObject.message = `Pagination is greater than ${AdLibValidator.MAX_PAGINATION}`;
      this.addToInvalidProperties(invalidObject);
      return;
    }
  }

  public addToInvalidProperties(property: {
    label: string;
    message: string;
  }): void {
    this.invalidProperties.push(property);
  }

  public getInvalidPropertiesAsString(): string {
    const invalidProperties = this.invalidProperties
      .map(({ label }) => label)
      .join(", ");
    return invalidProperties;
  }

  public getFormattedInvalidProperties(): string {
    return this.getInvalidProperties()
      .map(({ label, message }) => {
        return `${label}: ${message}`;
      })
      .join(", ");
  }

  public getInvalidProperties(): { label: string; message: string }[] {
    return this.invalidProperties;
  }

  public resetInvalidProperties(): void {
    this.invalidProperties = [];
  }

  private invalidProperties: {
    label: string;
    message: string;
  }[];

  private static MAX_PAGINATION: number = 100;
}
