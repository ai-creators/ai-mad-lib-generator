export type PromptEssentialProperties = Readonly<
  Required<{
    originalPrompt: string;
  }>
>;

export type PromptProperties = PromptEssentialProperties;

export interface Prompt {
  getOriginalPrompt(): string;
}

export class PromptImplementation implements Prompt {
  private readonly originalPrompt: string;

  getOriginalPrompt(): string {
    return this.originalPrompt;
  }
}
