import { NextFunction, Request, Response } from "express";
import { Configuration } from "openai";
import { GeneratorValidator } from "./GeneratorValidator";
import { ErrroHandler } from "../../errors/ErrorHandler";
import { LibVendor } from "../../lib-vendor/LibVendor";
import { Controller } from "../../common/Controller";
import { AdLibController } from "../adlib/AdLibController";
import { GeneratorService } from "./GeneratorService";
import { GeneratorRequestTransformer } from "./GeneratorRequestTransformer";
import { GeneratorProps } from "../../ts/types/GeneratorProps";

export class GeneratorController extends Controller {
  constructor() {
    super();
    this.service = new GeneratorService();
    this.validator = new GeneratorValidator();
    this.requestTransformer = new GeneratorRequestTransformer();
    this.generateLib = this.generateLib.bind(this);
  }

  public generateRandomLib(req: Request, res: Response, next: NextFunction) {}

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
      console.log("DATA PROMPT: ", data.prompt);
      const libVendor = new LibVendor(
        new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        })
      );
      console.log("LIB VENDOR: ", libVendor);
      const createAdLib = await libVendor.createFromPrompt(data.prompt);
      console.log("CREATED LIB: ", createAdLib);
      return AdLibController.sendResponse(res, createAdLib, 200);
    } catch (e: unknown) {
      console.log("ERROR: ", e);
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
