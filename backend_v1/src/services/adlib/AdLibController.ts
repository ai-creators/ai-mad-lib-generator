import { NextFunction, Request, Response } from "express";
import { Controller } from "../../common/Controller";
import { Service } from "../../common/Service";
import { AdLibService } from "./AdLibService";
import { AdLibValidator } from "./AdLibValidator";
import { ErrroHandler } from "../../errors/ErrorHandler";
import { AdLibProps } from "../../ts/types/AdLibProps";

export class AdLibController extends Controller {
  constructor() {
    super();
    this.service = new AdLibService();
    this.validator = new AdLibValidator();
    this.getLibs = this.getLibs.bind(this);
    this.transformRequest = this.transformRequest.bind(this);
  }

  private transformRequest(req: Request): AdLibProps {
    const page: number = parseInt((req.query.page as string) ?? 0);
    const pagination: number = parseInt((req.query.pagination as string) ?? 0);
    const time = req.query.timestamp;
    const type = (req.query.type as string) ?? "";
    const data: AdLibProps = {
      timestamp: new Date(time as string),
      pagination,
      page,
      type,
    };
    return data;
  }

  public async getLibs(req: Request, res: Response, next: NextFunction) {
    const data: AdLibProps = this.transformRequest(req);
    if (!this.validator.validate(data)) {
      return next({
        status: 400,
        message: `These properties are not valid: ${this.validator.getInvalidPropertiesAsString()}`,
      });
    }
    try {
      if (data?.type === "featured") {
        const foundAdLibs = await this.service.getLibsByFeatured(
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
}
