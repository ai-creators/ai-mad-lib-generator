import * as path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import errorHandler from "./errors/errorHandler";
import notFound from "./errors/notFound";
const { MAX_REQUEST_LIMIT } = process.env;
const { REQUEST_TIMEOUT } = process.env;

const app = express();

const limiter = rateLimit({
  windowsMs: parseInt(REQUEST_TIMEOUT),
  max: parseInt(MAX_REQUEST_LIMIT),
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());

app.use(cors("*"));

app.use(limiter);

app.use(notFound);
app.use(errorHandler);

export default app;
