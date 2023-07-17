import express from "express";
import { GeneratorRouter } from "./services/generator/GeneratorRouter";
import { AdLibRouter } from "./services/adlib/AdLibRouter";

const app = express();

app.use("/generate", GeneratorRouter.init);
app.use("/adlib", AdLibRouter.init);

export default app;
