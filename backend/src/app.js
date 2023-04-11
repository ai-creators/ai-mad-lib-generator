const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const generatorRoute = require("./generator/generator.router");
const libsRoute = require("./lib/lib.router");
const app = express();
const { MAX_REQUEST_LIMIT } = process.env;
const { REQUEST_TIMEOUT } = process.env;
if (!MAX_REQUEST_LIMIT) {
  throw new Error("No max request limit has been provided");
}
if (!REQUEST_TIMEOUT) {
  throw new Error("No request timeout has been provided");
}

const limiter = rateLimit({
  windowsMs: parseInt(REQUEST_TIMEOUT),
  max: parseInt(MAX_REQUEST_LIMIT),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(express.json());

app.use(cors("*"));
// routes
app.use("/libs", libsRoute);
app.use(limiter);
app.use("/generate", generatorRoute);

app.set("trust proxy", 2);
app.use("/api/", (req, res) => res.send(req.ip));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
