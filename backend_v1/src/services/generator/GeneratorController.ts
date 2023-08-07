import { NextFunction, Request, Response } from "express";
import { Configuration } from "openai";
import { GeneratorValidator } from "./GeneratorValidator";
import { ErrroHandler } from "../../errors/ErrorHandler";
import { LibVendor } from "../../vendors/libVendor/LibVendor";
import { Controller } from "../../common/Controller";
import { AdLibController } from "../adlib/AdLibController";
import { GeneratorService } from "./GeneratorService";
import { GeneratorRequestTransformer } from "./GeneratorRequestTransformer";
import { GeneratorProps } from "../../ts/types/GeneratorProps";
import { Prompt } from "./Prompt";

export class GeneratorController extends Controller {
  constructor() {
    super();
    this.generateLib = this.generateLib.bind(this);
    this.generateRandomLib = this.generateRandomLib.bind(this);
    this.getService = this.getService.bind(this);
  }

  public async generateRandomLib(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const randomPrompt: string =
        await this.getLibVendor().createRandomPrompt();
      const prompt: Prompt = new Prompt(randomPrompt);
      const createdAdLib = await this.getLibVendor().createFromPrompt(prompt);
      const savedAdLib = await this.getService().saveAdLib(createdAdLib);
      return AdLibController.sendResponse(res, savedAdLib, 200);
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  public async generateLib(req: Request, res: Response, next: NextFunction) {
    try {
      const data: GeneratorProps = GeneratorRequestTransformer.transform(req);
      if (!GeneratorController.validator.validate(data)) {
        const message = `These properties are not valid: ${GeneratorController.validator.getFormattedInvalidProperties()}`;
        GeneratorController.validator.resetInvalidProperties();
        return next({
          status: 400,
          message: message,
        });
      }
      const prompt: Prompt = new Prompt(data.prompt);
      const createdAdLib = await this.getLibVendor().createFromPrompt(prompt);
      const savedAdLib = await this.getService().saveAdLib(createdAdLib);
      return AdLibController.sendResponse(res, savedAdLib, 200);
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  public getService(): any {
    return GeneratorController.service;
  }

  public getLibVendor(): any {
    return GeneratorController.libVendor;
  }

  private static validator: GeneratorValidator = new GeneratorValidator();
  private static service: GeneratorService = new GeneratorService();
  private static libVendor: LibVendor = new LibVendor(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
  );
}
