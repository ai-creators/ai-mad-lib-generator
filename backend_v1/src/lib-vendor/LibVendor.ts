import { Configuration, OpenAIApi } from "openai";
const { MAX_TOKENS = "0" } = process.env;
export class LibVendor {
  private aiApi: OpenAIApi;
  private static MAX_TOKENS: number = parseInt(MAX_TOKENS);
  private static TEMPERATURE: number = 0.5;

  public constructor(configuartion: Configuration) {
    this.aiApi = new OpenAIApi(configuartion);
  }

  public async createFromPrompt(prompt: string) {
    try {
      const response = await this.aiApi.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: LibVendor.MAX_TOKENS,
        temperature: LibVendor.TEMPERATURE,
        n: 1,
      });
    } catch (e: unknown) {}
  }
}
