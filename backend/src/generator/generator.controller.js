const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { Configuration, OpenAIApi } = require("openai");

async function configureOpenAi(req,res,next) {
  try {
    console.log("CONFIGURING");
    
    res.locals.openai = openai
    return next();
  } catch(error) {
    return next({ status: 500, message: error.message});
  }
}

async function getMadLib(req,res,next) {
  try {
    const { OPENAI_API_KEY }= process.env;
    if (!OPENAI_API_KEY) {
      throw new Error("No open ai key has been provided");
    }
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    console.log("GET MAD LIB");
    const { prompt } = req.body.data;
    console.log("prompt: ", prompt)
    const { data } = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate mad lib with using [adjective: ] and no spaces inside the bracket. The mad lib will be: ${prompt}`,
      max_tokens: 100,
      temperature: 0
    })
    console.log("RESPONSE: ", data.choices[0].text);
    res.status(200).json({ data });
  } catch(error) {
    console.error(error);
    return next({
      status: 500, message: error
    })
  }
}

// Export the controller
module.exports = {
  madLibGenerator: [ asyncErrorBoundary(getMadLib)],
};


// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Say this is a test",
//   max_tokens: 7,
//   temperature: 0,
// });
//openai api key =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

// Define the Mad Lib template
// const template =
//   "One [adjective] day, I [verb] to the [noun] to buy some [plural noun].";

// // Use OpenAI API to generate suggestions for words
// async function generateSuggestions(prompt) {
//   const completions = await openai.createCompletion({
//     engine: "davinci",
//     prompt: prompt,
//     maxTokens: 50,
//     n: 1,
//     stop: null,
//     temperature: 0.5,
//   });
//   const message = completions.choices[0].text.trim();
//   return message;
// }

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
