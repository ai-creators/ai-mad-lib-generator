import { Validator } from "../../common/Validator";
import { GeneratorProps } from "../../ts/types/GeneratorProps";

export class GeneratorValidator implements Validator {
  constructor() {
    this.invalidProperties = [];
  }

  public validate(data: GeneratorProps): boolean {
    this.validatePrompt(data.prompt);
    return this.invalidProperties.length === 0;
  }

  private validatePrompt(prompt: String): void {
    const invalidObject: { label: string; message: string } = {
      label: "prompt",
      message: "",
    };
    if (!prompt) {
      invalidObject.message = "Prompt is required";
      this.addToInvalidProperties(invalidObject);
      return;
    }
    if (typeof prompt !== "string") {
      invalidObject.message = "Prompt needs to be of type string";
      this.addToInvalidProperties(invalidObject);
      return;
    }
    if (prompt.length > 255) {
      invalidObject.message = `Prompt has ${prompt.length} characters and cannot exceed 255 characters`;
      this.addToInvalidProperties(invalidObject);
      return;
    }
    return;
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
  }[] = [];

  private static readonly PROMPT_LENGTH = 255;
}
