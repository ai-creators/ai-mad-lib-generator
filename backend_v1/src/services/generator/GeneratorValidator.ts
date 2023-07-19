import { GeneratorProps } from "../../ts/types/GeneratorProps";

export class GeneratorValidator {
  public validate(data: GeneratorProps): boolean {
    if (!this.isValidPrompt(data.prompt)) {
      this.addToInvalidProperties("Prompt");
    }
    return this.getInvalidProperties().length === 0;
  }

  private isValidPrompt(prompt: String): boolean {
    return typeof prompt === "string" && prompt.length > 0;
  }

  public addToInvalidProperties(property: string): void {
    this.invalidProperties.push(property);
  }

  public getInvalidPropertiesAsString(): string {
    return this.invalidProperties.join(", ");
  }

  public getInvalidProperties(): string[] {
    return this.invalidProperties;
  }

  private invalidProperties: string[] = [];
}
