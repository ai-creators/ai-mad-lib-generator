export type PromptEssentialProperties = Readonly<
  Required<{
    originalPrompt: string;
  }>
>;

export type PromptProperties = PromptEssentialProperties;

export interface Prompt {
  getOriginalPrompt(): string;
  getValue(): string;
}

export class PromptImplementation implements Prompt {
  private readonly originalPrompt: string;
  private value: string;

  getOriginalPrompt(): string {
    return this.originalPrompt;
  }

  getValue(): string {
    return this.value;
  }
}
