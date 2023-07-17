import { GeneratorProps } from "../../ts/types/GeneratorProps";

export class GeneratorValidator {
  public validate(data: GeneratorProps): boolean {
    if (!this.isValidPrompt) {
      this.invalidProperties.push("Prompt");
    }
    return this.invalidProperties.length > 0;
  }

  private isValidPrompt(prompt: String): boolean {
    return typeof prompt === "string" && prompt.length > 0;
  }

  public getInvalidPropsAsString(): string {
    return this.invalidProperties.join(", ");
  }

  private invalidProperties: String[] = [];
}
