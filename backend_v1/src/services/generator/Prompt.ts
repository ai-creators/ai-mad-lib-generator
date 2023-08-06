export class Prompt {
  constructor(originalPrompt: string, patreonLevel: "silver" | "gold" | "platinum") {
    this.originalPrompt = originalPrompt;
    this.patreonLevel = patreonLevel;
    this.promptLimits = "The mad lib cannot exceed 500 tokens."; // default limit
    this.setPromptLimits();
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

  public setMinimumSentences(minSentences: number): void {
    this.minSentences = `The AI must generate at least ${minSentences} sentences.`;
  }

  public getPrompt(): string {
    return `${Prompt.PROMPT_RULES} ${this.promptLimits} ${this.minSentences} ${this.promptLength} ${this.originalPrompt}`;
  }

  private static readonly PROMPT_RULES: string =
    "Generate mad lib to fill out using [] for each replacement word to fill in. The brackets should have what the replacement is such as: adjective, noun, verb plurar noun, etc. If it's the same word suffix the word in the brackets with the number. Do not include spaces in the bracket but instead underscores.";
  private originalPrompt: string = "";
  private promptLimits: string = "";
}
