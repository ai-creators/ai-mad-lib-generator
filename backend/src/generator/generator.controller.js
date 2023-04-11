const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { Configuration, OpenAIApi } = require("openai");
const service = require("./generator.service");
const { MAX_TOKENS, MIN_TOKENS } = process.env;
const { OPENAI_API_KEY } = process.env;

if (!OPENAI_API_KEY) {
  throw new Error("No open ai key has been provided");
}
if (!MAX_TOKENS) {
  throw new Error("No max tokens has been provided");
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildPrompt(req, res, next) {
  if (!MAX_TOKENS) {
    return next({
      status: 500,
      message: "No max tokens have been provided",
    });
  }
  const { prompt = "" } = req.body.data;
  if (!prompt) {
    return next({
      status: 400,
      message: "A prompt is required",
    });
  }
  res.locals.userPrompt = req.body.data.prompt;
  res.locals.prompt = `Generate mad lib to fill out using [] for each replacement word to fill in. The brackets should have what the replacement is such as: adjective, noun, verb plurar noun, etc. If it's the same word suffix the word in the brackets with the number. Do not include spaces in the bracket but instead underscores. the mad lib cannot exceed ${MAX_TOKENS}. The prompt of the mad lib is: ${prompt}`;
  return next();
}

async function buildRandomPrompt(req, res, next) {
  try {
    if (!MAX_TOKENS) {
      return next({
        status: 500,
        message: "No max tokens have been provided",
      });
    }
    const openai = new OpenAIApi(configuration);
    const prompt = "Create a 5-8 word prompt for a short story without quotes";
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: parseInt(MAX_TOKENS),
      temperature: 0.5,
      n: 1,
    });
    if (data.choices && Array.isArray(data.choices)) {
      const { text } = data.choices[0];
      console.log("text: ", text);
      res.locals.userPrompt = text;
      res.locals.prompt = `Generate mad lib to fill out using [] for each replacement word to fill in. The brackets should have what the replacement is such as: adjective, noun, verb plurar noun, etc. If it's the same word suffix the word in the brackets with the number. Do not include spaces in the bracket but instead underscores. the mad lib cannot exceed ${MAX_TOKENS}. The prompt of the mad lib is: ${text}`;
      return next();
    }
  } catch (error) {
    console.error(error);
    return next({
      status: 500,
      message: error,
    });
  }
}

async function getMadLib(req, res, next) {
  try {
    const openai = new OpenAIApi(configuration);
    const { prompt } = res.locals;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: parseInt(MAX_TOKENS),
      temperature: 0.5,
      n: 1,
    });
    if (data.choices && Array.isArray(data.choices)) {
      const { text } = data.choices[0];
      console.log("GET MAD LIB: ", text);
      const lib = { prompt: res.locals.userPrompt, text };
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
  console.log("DATA: ", data);
  res.status(200).json({ data });
}

// Export the controller
module.exports = {
  generateMadLib: [
    buildPrompt,
    asyncErrorBoundary(getMadLib),
    asyncErrorBoundary(saveMadLib),
    sendPayload,
  ],
  generateRandomMadLib: [
    asyncErrorBoundary(buildRandomPrompt),
    asyncErrorBoundary(getMadLib),
    asyncErrorBoundary(saveMadLib),
    sendPayload,
  ],
};
