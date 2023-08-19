const filterOptions = ["funny", "serious", "crazy", "neutral"];

export class Prompt {
  private static readonly PROMPT_RULES: string = 'Default rules';
  private patreonLevel: "silver" | "gold" | "platinum";
  private originalPrompt: string;
  private promptLimits: string;
  private minSentences: string = '';
  private promptLength: string = '';
  private filter: "funny" | "serious" | "crazy" | "neutral" = "neutral";

  constructor(originalPrompt: string, patreonLevel: "silver" | "gold" | "platinum" = "silver", filter: "funny" | "serious" | "crazy" | "neutral" = "neutral") {
    this.originalPrompt = originalPrompt;
    if (originalPrompt.split(" ").length > 50) {
      throw new Error("The initial prompt cannot exceed 50 words.");
    }

    this.patreonLevel = patreonLevel;

    this.setFilter(filter, filterOptions);

    this.promptLimits = "The mad lib cannot exceed 500 tokens."; // default limit
    this.setPromptLimits();
    this.setMinimumSentences();
    this.promptLength = '';
  }

  public setPromptLimits(): void {
    this.promptLimits = "Make sure it’s at least 3 sentences. The mad lib cannot exceed 50 words.";  // Example value
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

  public getFilter(): "funny" | "serious" | "crazy" | "neutral" {
    return this.filter;
  }

  public setFilter(filter: "funny" | "serious" | "crazy" | "neutral", filterOptions: string[]): void {
    if (filterOptions.includes(filter)) {
      this.filter = filter;
    } else {
      throw new Error("Invalid filter type.");
    }
  }

  public getPrompt(): string {
    return `${Prompt.PROMPT_RULES} ${this.promptLimits} ${this.minSentences} ${this.promptLength} Filter: ${this.filter} ${this.originalPrompt}`;
  }

  public getPatreonLevel(): "silver" | "gold" | "platinum" {
    return this.patreonLevel;
  }
}
