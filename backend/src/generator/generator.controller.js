const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { Configuration, OpenAIApi } = require("openai");

async function getMadLib(req, res, next) {
  try {
    const { OPENAI_API_KEY } = process.env;
    if (!OPENAI_API_KEY) {
      throw new Error("No open ai key has been provided");
    }
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Check if the data object is provided
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Missing data object in request body" });
    }

    // Use the prompt from the request body
    const { prompt } = data;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    // Check if the prompt format is correct (contains brackets)
    if (!/\[.*\]/.test(prompt)) {
      return res.status(400).json({ error: "Invalid prompt format. Use brackets around placeholders" });
    }

    const min_tokens = 50;
    const max_tokens = 100;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate mad lib to fill out with using [] and no spaces inside the bracket. 
      Any word inside the bracket should not use spaces, and adjective/noun/verb/pluralnoun should be in the bold format, 
      but instead use underscores. The mad lib cannot exceed ${max_tokens} tokens and be less then ${min_tokens}. 
      Use what type of word it is. The prompt is ${prompt}`,
      max_tokens,
      temperature: 0.5,
      n: 1,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return next({
      status: 500,
      message: error,
    });
  }
}

// Export the controller
module.exports = {
  madLibGenerator: [asyncErrorBoundary(getMadLib)],
};
