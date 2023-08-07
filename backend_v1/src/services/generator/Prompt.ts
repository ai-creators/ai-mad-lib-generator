export class Prompt {
  constructor(originalPrompt: string, patreonLevel: "silver" | "gold" | "platinum" = "silver") {
    this.originalPrompt = originalPrompt;
    this.patreonLevel = patreonLevel;
    this.promptLimits = "The mad lib cannot exceed 500 tokens."; // default limit
    this.setPromptLimits();
    this.minSentences = '';
    this.promptLength = '';
  }

  public setPromptLimits(): void {
    // Placeholder method. Modify as needed.
    this.promptLimits = "Default limit";  // Example value
  }

  public getPromptLimits(): string {
    return this.promptLimits;
  }

  public getOriginalPrompt(): string {
    return this.originalPrompt;
  }

  public setLength(length: "short" | "medium" | "long"): void {
    this.promptLength = `Keep the mad lib ${length}`;
  }

  public getMinimumSentences(): string {
    return this.minSentences;
  }

  public setMinimumSentences(minSentences: number = 3): void {
    this.minSentences = `The AI must generate at least ${minSentences} sentences.`;
  }

  public getPrompt(): string {
    return `${Prompt.PROMPT_RULES} ${this.promptLimits} ${this.minSentences} ${this.promptLength} ${this.originalPrompt}`;
  }
  public getPatreonLevel(): "silver" | "gold" | "platinum" {
    return this.patreonLevel;
  }

  public patreonLevel: "silver" | "gold" | "platinum";
  public originalPrompt: string;
  public promptLimits: string;
  public minSentences: string;
  public promptLength: string;

  public static readonly PROMPT_RULES: string = 'Default rules';
}
