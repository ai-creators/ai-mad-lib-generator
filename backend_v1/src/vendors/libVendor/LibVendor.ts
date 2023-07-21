import { Configuration, OpenAIApi } from "openai";
import { OpenAiApiResponse } from "../../ts/types/OpenAiApiResponse";
import { Prompt } from "../../services/generator/Prompt";
const { MAX_TOKENS = "0" } = process.env;

type AiApiResponseChoices = {
  finish_reason: string;
  index: number | null;
  message: {
    content: string;
    role: string;
  };
};

export class LibVendor {
  private aiApi: OpenAIApi;
  private static MAX_TOKENS: number = parseInt(MAX_TOKENS);
  private static TEMPERATURE: number = 0.5;

  public constructor(configuartion: Configuration) {
    this.aiApi = new OpenAIApi(configuartion);
  }

  public async createFromPrompt(prompt: Prompt): Promise<any> {
    try {
      prompt.setPromptLimits(LibVendor.MAX_TOKENS);
      const response: any = await this.aiApi.createCompletion({
        model: "text-davinci-003",
        prompt: prompt.getPrompt(),
        max_tokens: LibVendor.MAX_TOKENS,
        temperature: LibVendor.TEMPERATURE,
        n: 1,
      });
      console.log("RESPONSE: ", response.data);
      return response.data.choices[0];
    } catch (e: unknown) {
      console.log("ERROR IN VENODR: ", e);
    }
  }
}
