import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import { OpenAiApiResponse } from "../../ts/types/OpenAiApiResponse";
import { Prompt } from "../../services/generator/Prompt";
import { LibVendorTransformer } from "./LibVendorTransformer";
import { LibVendorResponse } from "./LibVendorResponse";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
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
  private static TEMPERATURE: number = 0.5;

  public constructor(configuartion: Configuration) {
    this.aiApi = new OpenAIApi(configuartion);
  }

  public async createFromPrompt(prompt: Prompt): Promise<IAdLib> {
    try {
      prompt.setLength("short");
      const response: any = await this.aiApi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: prompt.getPrompt(),
          },
        ],
        temperature: LibVendor.TEMPERATURE,
        n: 1,
      });
      console.log("RESPONSE: ", response.data);
      const formattedResponse = this.transformer.transform(response.data);
      return this.validateResponse(formattedResponse, prompt);
    } catch (e: unknown) {
      console.log("ERROR IN VENODR: ", e);
      throw e;
    }
  }

  private validateResponse(
    response: LibVendorResponse,
    prompt: Prompt
  ): IAdLib {
    const adLib: IAdLib = this.transformer.transFormToLib(response, prompt);
    return adLib;
  }

  private transformer: LibVendorTransformer = new LibVendorTransformer();
}