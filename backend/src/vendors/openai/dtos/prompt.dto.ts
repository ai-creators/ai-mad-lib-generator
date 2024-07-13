export class PromptDto {
  prompt: string;
  length: string;

  private readonly promptRules: string = `Create a a mad lib based on this prompt. 
  Make sure the mad lib is at least 3 sentences and at least 500 characters. Use brackets [] whenever an input is required and include the type of speach inside it. Make sure that there isn't any spaces in between the brackets and instead use _ for spaces. Outside of the brackets, spaces should be used normally. 
  There needs to be at least 4 mad lib inputs. This is very important. Spread them out throughout the madlib. Make sure the inputs are formatted properly. Use snake case if the type of speech has a space. The response must be in json format. Include in the json response a property of categories that is an array of strings of what the category it is. Futhermore, include a property isPg that is a boolean value if the madlib is PG rated. The madlib should be a property of madlib and is of type string. Also include a property of title that is the title of the madlib.`;

  private readonly example: string = `Welcome to [an_adjective] adventure park filled with [plural_noun] and excitement. The park is home to many different species of [animal_plural] including the majestic [a_type_of_dinosaur]. Visitors can take a ride on the [adjective] roller coaster or explore the [adjective] trails. Don't forget to visit the petting zoo where you can feed the friendly [plural_noun].`;

  public buildPrompt(): string {
    return `${this.promptRules} The prompt is in between the double quotes here: "${this.prompt}". Here is an example of the desired format: "${this.example}".`;
  }
}
