import { NextFunction, Request, Response } from "express";
import { Configuration } from "openai";
import { GeneratorValidator } from "./GeneratorValidator";
import { ErrroHandler } from "../errors/ErrorHandler";
import { LibVendor } from "../lib-vendor/LibVendor";

export class GeneratorController {
  public static generateRandomLib(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}

  public static async generateLib(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { prompt = "" } = req.body;
    const data = {
      prompt,
    };
    if (!this.validator.validate(data)) {
      return next({
        status: 400,
        message: `These properties are not valid: ${this.validator.getInvalidPropsAsString()}`,
      });
    }
    try {
      const libVendor = new LibVendor(
        new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        })
      );
      const createdLib = await libVendor.createFromPrompt(prompt);
      res.status(200).json(createdLib);
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  private static readonly validator: GeneratorValidator =
    new GeneratorValidator();
}
