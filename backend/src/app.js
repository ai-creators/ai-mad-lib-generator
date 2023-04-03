const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const generatorRoute = require("./generator/generator.router");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/generate", generatorRoute);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
