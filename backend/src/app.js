const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");

const app = express();

// routes

app.use(express.json);

module.exports = app;
