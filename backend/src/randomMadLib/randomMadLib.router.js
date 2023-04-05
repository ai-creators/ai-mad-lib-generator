const express = require("express");
const router = express.Router();
const randomMadLibController = require("./randomMadLib.controller");

// Define the route for generating a random mad lib
router.post("/generate", randomMadLibController.generateRandomMadLib);

module.exports = randomgeneratorRouter;
