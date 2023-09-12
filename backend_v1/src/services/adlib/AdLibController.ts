import { NextFunction, Request, Response } from "express";
import { Controller } from "../../common/Controller";
import { AdLibService } from "./AdLibService";
import { AdLibValidator } from "./AdLibValidator";
import { ErrroHandler } from "../../errors/ErrorHandler";
import { AdLibProps } from "../../ts/types/AdLibProps";
import { AdLibRequestTransformer } from "./AdLibRequestTransformer";
import { AdLibSearchProps } from "../../ts/types/AdLibSearchProps";

export class AdLibController extends Controller {
  constructor() {
    super();
    this.getLibs = this.getLibs.bind(this);
    this.getLibsBySearch = this.getLibsBySearch.bind(this);
    this.getUserLibs = this.getUserLibs.bind(this);
  }

  public async getLibs(req: Request, res: Response, next: NextFunction) {
    try {
      const data: AdLibProps = this.getRequestTransformer().transform(req);
      if (!this.getValidator().validate(data)) {
        const message = `These properties are not valid: ${this.getValidator().getFormattedInvalidProperties()}`;
        return next({
          status: 400,
          message: message,
        });
      }
      if (data?.type === "featured") {
        const foundAdLibs = await this.getService().getLibsByFeatured(
          new Date(req.query.timestamp as string),
          data.page,
          data.pagination,
          data.isPG
        );
        return AdLibController.sendResponse(res, foundAdLibs, 200);
      } else if (data?.type === "newest") {
        const foundAdLibs = await this.getService().getLibsByNewest(
          new Date(req.query.timestamp as string),
          data.page,
          data.pagination,
          data.isPG
        );
        return AdLibController.sendResponse(res, foundAdLibs, 200);
      } else {
        const foundAdLibs = await this.getService().getLibs(
          new Date(req.query.timestamp as string),
          data.page,
          data.pagination,
          data.isPG
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

  public async getLibsBySearch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data: AdLibSearchProps =
        this.getRequestTransformer().transformSearch(req);
      if (!this.getValidator().validateSearchData(data)) {
        const message = `These properties are not valid: ${this.getValidator().getFormattedInvalidProperties()}`;
        return next({
          status: 400,
          message: message,
        });
      }
      const foundAdLibs = await this.getService().getLibsBySearch(
        data.search,
        data.page,
        data.pagination,
        data.timestamp,
        data.isPG
      );
      return AdLibController.sendResponse(res, foundAdLibs, 200);
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  public async getUserLibs(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = this.getRequestTransformer().transformUserId(req);
      const data: AdLibProps = this.getRequestTransformer().transform(req);
      if (!user_id) {
        return next({
          status: 400,
          message: "No user id provided.",
        });
      }
      const { timestamp, page, pagination } = data;
      const foundAdLibs = await this.getService().getLibsByUser(
        timestamp,
        page,
        pagination,
        user_id
      );
      return AdLibController.sendResponse(res, foundAdLibs, 200);
    } catch (e: unknown) {
      const error = ErrroHandler.ensureError(e);
      return next({
        status: 400,
        message: error.message,
      });
    }
  }

  public getService(): AdLibService {
    return AdLibController.service;
  }

  public getValidator(): AdLibValidator {
    return AdLibController.validator;
  }

  public getRequestTransformer(): AdLibRequestTransformer {
    return AdLibController.requestTransformer;
  }
  private static service: AdLibService = new AdLibService();
  private static validator: AdLibValidator = new AdLibValidator();
  private static requestTransformer: AdLibRequestTransformer =
    new AdLibRequestTransformer();
}
