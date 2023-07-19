import { AdLibProps } from "../../ts/types/AdLibProps";

export class AdLibValidator {
  constructor() {
    this.invalidProperties = [];
  }

  public validate(data: AdLibProps): boolean {
    if (!this.isValidTimeStamp(data.timestamp)) {
      this.addToInvalidProperties("timestamp");
    }
    if (!this.isValidPage(data.page)) {
      this.addToInvalidProperties("page");
    }
    if (!this.isValidPagination(data.pagination)) {
      this.addToInvalidProperties("pagination");
    }
    return this.invalidProperties.length === 0;
  }

  private isValidTimeStamp(timestamp: Date): boolean {
    if (!timestamp) {
      return false;
    }
    if (timestamp instanceof Date && isNaN(timestamp.getTime())) {
      return false;
    }
    const currentTime = new Date();
    if (currentTime < timestamp) {
      return false;
    }
    return true;
  }

  private isValidPage(page: number): boolean {
    if (!page || page <= 0) {
      return false;
    }
    return true;
  }

  private isValidPagination(pagination: number): boolean {
    console.log(!pagination);
    if (!pagination || pagination <= 0 || pagination > 100) {
      return false;
    }
    return true;
  }

  public addToInvalidProperties(property: string): void {
    this.invalidProperties.push(property);
  }

  public getInvalidPropertiesAsString(): string {
    const invalidProperties = this.invalidProperties.join(", ");
    this.setInvalidProperties([]);
    return invalidProperties;
  }

  public getInvalidProperties(): string[] {
    return this.invalidProperties;
  }

  public setInvalidProperties(reset: string[]) {
    this.invalidProperties = reset;
  }

  private invalidProperties: string[];
}
