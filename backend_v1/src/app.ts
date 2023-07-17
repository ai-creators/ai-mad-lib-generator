import express from "express";
import { GeneratorRouter } from "./generator/GeneratorRouter";

const app = express();

app.use("/generate", GeneratorRouter.init);

export default app;
