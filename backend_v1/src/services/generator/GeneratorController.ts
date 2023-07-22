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
  }

  public generateRandomLib(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  public async generateLib(req: Request, res: Response, next: NextFunction) {
    console.log("REQ: ", req.body.data);
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
      const createAdLib = await libVendor.createFromPrompt(prompt);
      const savedAdLib = await this.service.saveAdLib(createAdLib);
      return AdLibController.sendResponse(res, createAdLib, 200);
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
