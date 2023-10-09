import { Request } from "express";
import { GeneratorProps } from "../../ts/types/GeneratorProps";

export class GeneratorRequestTransformer {
  public static transform(req: Request): GeneratorProps {
    if (!req.body.hasOwnProperty("data")) {
      throw new Error("No data has been provided");
    }
    const prompt: string = req.body.data.prompt ?? "";
    const userId: string = req.body.data.userId ?? "";
    const data: GeneratorProps = {
      prompt,
      createdBy: userId,
    };
    return data;
  }
}
