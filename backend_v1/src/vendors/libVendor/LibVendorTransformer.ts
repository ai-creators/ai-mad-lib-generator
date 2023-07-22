import { Prompt } from "../../services/generator/Prompt";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
import { LibVendorResponse } from "./LibVendorResponse";

export class LibVendorTransformer {
  public transform(data: LibVendorResponse) {
    const formattedData: LibVendorResponse = data;
    return formattedData;
  }

  public transFormToLib(response: LibVendorResponse, prompt: Prompt): IAdLib {
    return {
      prompt: prompt.getOriginalPrompt(),
      text: response.choices[0].message.content,
    };
  }
}
