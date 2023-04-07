const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { Configuration, OpenAIApi } = require("openai");
const service = require("./generator.service");
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
    // Use the prompt from the request body
    const { prompt } = req.body.data;

    const min_tokens = 50;
    const max_tokens = 50;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate mad lib to fill out with using [] and no spaces inside the bracket. 
      Any word inside the bracket should not use spaces, and adjective/noun/verb/pluralnoun should be in the bold format, 
      but instead use underscores. The mad lib cannot exceed ${max_tokens} tokens and be less then ${min_tokens}. 
      Use what type of word it is. The prompt is ${prompt}`,
      max_tokens,
      temperature: 0.5,
      n: 1,
    });
    if (data.choices && Array.isArray(data.choices)) {
      const { text } = data.choices[0];
      const lib = { prompt, text };
      res.locals.lib = lib;
      return next();
    }
    return next({
      status: 400,
      message: "Error creating ad-lib please try again.",
    });
  } catch (error) {
    console.error(error);
    return next({
      status: 500,
      message: error,
    });
  }
}

async function saveMadLib(req, res, next) {
  const { lib } = res.locals;
  if (lib) {
    const data = await service.create(lib);
    res.locals.data = data;
    return next();
  }
  return next({
    status: 500,
    message: "Error saving mad lib",
  });
}

function sendPayload(req, res, next) {
  const { data } = res.locals;
  res.status(200).json({ data });
}

// Export the controller
module.exports = {
  madLibGenerator: [
    asyncErrorBoundary(getMadLib),
    asyncErrorBoundary(saveMadLib),
    sendPayload,
  ],
};
