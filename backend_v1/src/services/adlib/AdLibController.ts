import { NextFunction, Request, Response } from "express";
import { Controller } from "../../common/Controller";
import { AdLibService } from "./AdLibService";
import { AdLibValidator } from "./AdLibValidator";
import { ErrroHandler } from "../../errors/ErrorHandler";
import { AdLibProps } from "../../ts/types/AdLibProps";
import { AdLibRequestTransformer } from "./AdLibRequestTransformer";

export class AdLibController extends Controller {
  constructor() {
    super();
    this.service = new AdLibService();
    this.validator = new AdLibValidator();
    this.requestTransformer = new AdLibRequestTransformer();
    this.getLibs = this.getLibs.bind(this);
  }

  public async getLibs(req: Request, res: Response, next: NextFunction) {
    try {
      const data: AdLibProps = this.requestTransformer.transform(req);
      if (!this.validator.validate(data)) {
        const message = `These properties are not valid: ${this.validator.getFormattedInvalidProperties()}`;
        this.validator.resetInvalidProperties();
        return next({
          status: 400,
          message: message,
        });
      }
      if (data?.type === "featured") {
        const foundAdLibs = await this.service.getLibsByFeatured(
          new Date(req.query.timestamp as string),
          data.page,
          data.pagination
        );
        return AdLibController.sendResponse(res, foundAdLibs, 200);
      } else if (data?.type === "newest") {
        const foundAdLibs = await this.service.getLibsByNewest(
          new Date(req.query.timestamp as string),
          data.page,
          data.pagination
        );
        return AdLibController.sendResponse(res, foundAdLibs, 200);
      } else {
        const foundAdLibs = await this.service.getLibs(
          new Date(req.query.timestamp as string),
          data.page,
          data.pagination
        );
        return AdLibController.sendResponse(res, foundAdLibs, 200);
      }
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  private service: AdLibService;
  private validator: AdLibValidator;
  private requestTransformer: AdLibRequestTransformer;
}
