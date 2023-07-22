import { Request } from "express";
import { GeneratorProps } from "../../ts/types/GeneratorProps";

export class GeneratorRequestTransformer {
  public transform(req: Request): GeneratorProps {
    const prompt: string = req.body.data?.prompt ?? "";
    const data: GeneratorProps = {
      prompt,
    };
    return data;
  }
}
