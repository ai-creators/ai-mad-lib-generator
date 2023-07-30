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
    this.service = new GeneratorService();
    this.validator = new GeneratorValidator();
    this.requestTransformer = new GeneratorRequestTransformer();
    this.generateLib = this.generateLib.bind(this);
    this.generateRandomLib = this.generateRandomLib.bind(this);
  }

  public async generateRandomLib(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const libVendor = new LibVendor(
        new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        })
      );
      const randomPrompt: string = await libVendor.createRandomPrompt();
      const prompt: Prompt = new Prompt(randomPrompt);
      const createdAdLib = await libVendor.createFromPrompt(prompt);
      console.log("CREATED: ", createdAdLib);
      const savedAdLib = await this.service.saveAdLib(createdAdLib);
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
    const data: GeneratorProps = this.requestTransformer.transform(req);
    if (!this.validator.validate(data)) {
      const message = `These properties are not valid: ${this.validator.getFormattedInvalidProperties()}`;
      this.validator.resetInvalidProperties();
      return next({
        status: 400,
        message: message,
      });
    }
    try {
      const libVendor = new LibVendor(
        new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        })
      );
      const prompt: Prompt = new Prompt(data.prompt);
      const createdAdLib = await libVendor.createFromPrompt(prompt);
      const savedAdLib = await this.service.saveAdLib(createdAdLib);
      return AdLibController.sendResponse(res, savedAdLib, 200);
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  private service: GeneratorService;
  private validator: GeneratorValidator;
  private requestTransformer: GeneratorRequestTransformer;
}
