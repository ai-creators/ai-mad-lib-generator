const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const app = express();

app.use(express.json);

// routes

app.use(notFound);
app.use(errorHandler);

module.exports = app;
