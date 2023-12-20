export class PromptDto {
  prompt: string;
  length: string;

  private readonly promptRules: string = `
    Create a a mad lib based on this prompt. 
    Make sure the mad lib is at least 3 sentences and at least 500 characters. Use brackets [] whenever an input is required and include the type of speach inside it. Make sure that there isn't any spaces in between the brackets, and instead of using spaces, use _ for the space inside the brackets []. 
    Use snake case if the type of speech has a space. The response must be in json format. Include in the json response a property of categories that is an array of strings of what the category it is. Futhermore, include a property isPg that is a boolean value if the madlib is PG rated. The madlib should be a property of madlib and is of type string. Also include a property of title that is the title of the madlib.`;

  public buildPrompt(): string {
    return `${this.promptRules} The prompt is: "${this.prompt}".`;
  }
}
