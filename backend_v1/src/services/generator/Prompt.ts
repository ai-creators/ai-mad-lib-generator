export class Prompt {
  constructor(originalPrompt: string) {
    this.originalPrompt = originalPrompt;
  }

  public getPromptLimits(): string {
    return this.promptLimits;
  }

  public getOriginalPrompt(): string {
    return this.originalPrompt;
  }

  public setLength(length: "short" | "medium" | "long"): void {
    this.promptLimits = `Keep the ad lib ${length}`;
  }

  public getPrompt(): string {
    return `${Prompt.PROMPT_RULES} ${this.promptLimits}. Make the mad lib a mininum of 3 sentences and 50 words. ${this.originalPrompt}`;
  }

  public setResponseAsJSON(): void {
    this.responseType =
      "Respond in json format with a key of adlib and the value of the madlib response. add a key of error and value of the reason the mad lib cannot be created.";
  }

  private static readonly PROMPT_RULES: string =
    "Generate mad lib to fill out using [] for each replacement word to fill in. The brackets should have what the replacement is such as: adjective, noun, verb plurar noun, etc. If it's the same word suffix the word in the brackets with the number. Do not include spaces in the bracket but instead underscores.";
  private originalPrompt: string = "";
  private promptLimits: string = "";
  private responseType: string = "";
}
