import express, { Express } from "express";
import cors from "cors";
import { GeneratorRouter } from "./services/generator/GeneratorRouter";
import { AdLibRouter } from "./services/adlib/AdLibRouter";
import { RouterErrorHandler } from "./errors/RouterErrorHandler";
import helmet from "helmet";

class App {
  private constructor() {}

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private generateHelpers(): void {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.FRONT_END_BASE_URL,
      })
    );
  }

  private generateRoutes(): void {
    // this.app.use("/generate", GeneratorRouter.init);
    this.app.use("/generator", GeneratorRouter.init());
    this.app.use("/adlib", AdLibRouter.init());
    this.app.use(RouterErrorHandler.notFound);
    this.app.use(RouterErrorHandler.handler);
  }

  public init(): void {
    this.generateHelpers();
    this.generateRoutes();
  }

  public getExpressApp(): Express {
    return this.app;
  }

  private app: Express = express();

  private static instance: App;
}

const app = App.getInstance();
export default app;
