//openai api key =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

const openai = require("openai");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Get OpenAI API key from .env file
const key = process.env.OPENAI_API_KEY;

// Set up OpenAI API credentials
openai.apiKey = key;

// Define the Mad Lib template
const template =
  "One [adjective] day, I [verb] to the [noun] to buy some [plural noun].";

// Use OpenAI API to generate suggestions for words
async function generateSuggestions(prompt) {
  const completions = await openai.complete({
    engine: "davinci",
    prompt: prompt,
    maxTokens: 50,
    n: 1,
    stop: null,
    temperature: 0.5,
  });
  const message = completions.choices[0].text.trim();
  return message;
}

// Define the endpoint for the Mad Lib generator
async function madLibGenerator(req, res) {
  try {
    // Generate suggestions for words
    const adjective = await generateSuggestions("Suggest an adjective");
    const verb = await generateSuggestions("Suggest a verb");
    const noun = await generateSuggestions("Suggest a noun");
    const pluralNoun = await generateSuggestions("Suggest a plural noun");

    // Get user input for words
    const userInput = {
      adjective: req.body.adjective,
      verb: req.body.verb,
      noun: req.body.noun,
      pluralNoun: req.body.pluralNoun,
    };

    // Generate the completed Mad Lib
    let madLib = template;
    madLib = madLib.replace("[adjective]", userInput.adjective || adjective);
    madLib = madLib.replace("[verb]", userInput.verb || verb);
    madLib = madLib.replace("[noun]", userInput.noun || noun);
    madLib = madLib.replace(
      "[plural noun]",
      userInput.pluralNoun || pluralNoun
    );

    res.json({ madLib: madLib });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

// Export the controller
module.exports = {
  madLibGenerator: [asyncErrorBoundary(madLibGenerator)],
};
