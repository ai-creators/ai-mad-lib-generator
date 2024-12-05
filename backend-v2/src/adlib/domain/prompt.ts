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
  private rules: string = `Create a mad lib based on the prompt given at the end. Make sure the mad lib is at least 3 sentences and at least 500 characters. Use brackets: [] whenever an input is required and include the type of speech the input would be inside of it. If the word should be used again, add the number of the word. For example, noun_1. Make sure the input is formatted properly. Use snake case if the type of speech has a space. The response should be an object, and it should have the property categories which is an array of strings of what the categories are. Furthermore, it should have a property isPg that is a boolean value if the prompt and adlib is PG rated. Also include a property of the title that is the title of the madlib. Lastly, there should be a property of madlib that contains the madlib that will be created. Also don't hallucinate and dont include a $ sign at the start.`;
  private example: string = `Welcome to [adjective] adventure park filled with [plural_noun] and excitement. The park is home to many different species of [animal_plural] including the majestic [a_type_of_dinosaur]. Visitors can take a ride on the [adjective] roller coaster or explore the [adjective] trails. Don't forget to visit the petting zoo where you can feed the friendly [plural_noun].`;

  constructor(properties: PromptProperties) {
    Object.assign(this, properties);
  }

  getOriginalPrompt(): string {
    return this.originalPrompt;
  }

  getValue(): string {
    return `${this.rules}
    Here is an example of what the madlib should look like: "$${this.example}".
    Also, the prompt for the madlib to be created is: "${this.originalPrompt}".`;
  }
}
