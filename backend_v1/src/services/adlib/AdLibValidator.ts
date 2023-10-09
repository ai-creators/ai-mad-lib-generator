import { Validator } from "../../common/Validator";
import { IAdLibResponseQuestion } from "../../ts/Interfaces/IAdLibResponseQuestion";
import { AdLibProps } from "../../ts/types/AdLibProps";
import { AdLibResponseProps } from "../../ts/types/AdLibResponseProps";
import { AdLibSearchProps } from "../../ts/types/AdLibSearchProps";
import { AdLibService } from "./AdLibService";

export class AdLibValidator implements Validator {
  constructor() {
    this.invalidProperties = [];
    this.getAdlibService = this.getAdlibService.bind(this);
  }

  public validate(data: AdLibProps): boolean {
    this.resetInvalidProperties();
    this.validateTimestamp(data.timestamp);
    this.validatePage(data.page);
    this.validatePagination(data.pagination);
    return this.invalidProperties.length === 0;
  }

  public validateSearchData(data: AdLibSearchProps): boolean {
    this.resetInvalidProperties();
    this.validateSearch(data.search);
    this.validateTimestamp(data.timestamp);
    this.validatePage(data.page);
    this.validatePagination(data.pagination);
    return this.invalidProperties.length === 0;
  }

  public async validateAdlibResponse(
    data: AdLibResponseProps
  ): Promise<boolean> {
    await this.validateAdlibId(data.adlibId);
    this.validateQuestions(data.questions);
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

  private validateSearch(search: string): void {
    const invalidObject: { label: string; message: string } = {
      label: "search",
      message: "",
    };
    if (!search) {
      invalidObject.message = `search is not defined or is empty`;
      this.addToInvalidProperties(invalidObject);
      return;
    }

    if (search.length >= AdLibValidator.MAX_SEARCH_LENGTH) {
      invalidObject.message = `search cannot be longer than ${AdLibValidator.MAX_SEARCH_LENGTH} characters`;
      this.addToInvalidProperties(invalidObject);
      return;
    }
  }

  private async validateAdlibId(adlibId: string): Promise<void> {
    const invalidObject: { label: string; message: string } = {
      label: "adlibId",
      message: "",
    };
    if (!adlibId) {
      invalidObject.message = `adlib id is not defined or is empty`;
      this.addToInvalidProperties(invalidObject);
      return;
    }
    try {
      const foundAdlib = await AdLibValidator.adlibService.getLib(adlibId);
      if (!foundAdlib) {
        invalidObject.message = `adlib cannot be found from id`;
        this.addToInvalidProperties(invalidObject);
        return;
      }
    } catch (error: any) {
      invalidObject.message = `Error fetching adlib`;
      this.addToInvalidProperties(invalidObject);
      return;
    }
  }

  private validateQuestions(questions: IAdLibResponseQuestion[]): void {
    const invalidObject: { label: string; message: string } = {
      label: "questions",
      message: "",
    };
    for (const question of questions) {
      if (!this.validateQuestion(question)) {
        invalidObject.message = `Adlib questions are invalid.`;
        this.addToInvalidProperties(invalidObject);
        return;
      }
    }
  }

  private validateQuestion(question: IAdLibResponseQuestion): boolean {
    return question && question.answer.length > 0;
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

  private static MAX_PAGINATION: number = parseInt(
    process.env.MAX_PAGINATION ?? "100"
  );

  private static MAX_SEARCH_LENGTH: number = parseInt(
    process.env.MAX_SEARCH ?? "1000"
  );

  public getAdlibService(): AdLibService {
    return AdLibValidator.adlibService;
  }

  private static adlibService: AdLibService = new AdLibService();
}
