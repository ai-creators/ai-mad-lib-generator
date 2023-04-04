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

    // Use the prompt from the request body
    const { prompt } = req.body.data;

    const min_tokens = 50;
    const max_tokens = 50;
    console.log("prompt: ", prompt);
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
    console.log(data);
    res.status(200).json({ data });
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
// async function madLibGenerator(req, res) {
//   try {
//     // Generate suggestions for words
//     const adjective = await generateSuggestions("Suggest an adjective");
//     const verb = await generateSuggestions("Suggest a verb");
//     const noun = await generateSuggestions("Suggest a noun");
//     const pluralNoun = await generateSuggestions("Suggest a plural noun");

//     // Get user input for words
//     const userInput = {
//       adjective: req.body.adjective,
//       verb: req.body.verb,
//       noun: req.body.noun,
//       pluralNoun: req.body.pluralNoun,
//     };

//     // Generate the completed Mad Lib
//     let madLib = template;
//     madLib = madLib.replace("[adjective]", userInput.adjective || adjective);
//     madLib = madLib.replace("[verb]", userInput.verb || verb);
//     madLib = madLib.replace("[noun]", userInput.noun || noun);
//     madLib = madLib.replace(
//       "[plural noun]",
//       userInput.pluralNoun || pluralNoun
//     );

//     res.json({ madLib: madLib });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// }

// async function getMadLib(req, res, next) {
//   try {
//     const { OPENAI_API_KEY, DALLE_API_KEY } = process.env;
//     if (!OPENAI_API_KEY) {
//       throw new Error("No OpenAI API key has been provided");
//     }
//     if (!DALLE_API_KEY) {
//       throw new Error("No DALL-E API key has been provided");
//     }
//     const openaiConfig = new Configuration({
//       apiKey: OPENAI_API_KEY,
//     });
//     const openai = new OpenAIApi(openaiConfig);
//     console.log("GET MAD LIB");

//     // Get user input for words
//     const adjective = req.body.adjective;
//     const verb = req.body.verb;
//     const noun = req.body.noun;
//     const pluralNoun = req.body.pluralNoun;

//     // Use the prompt from the request body
//     const { prompt } = req.body.data;

//     // Use OpenAI to generate mad lib text
//     console.log("prompt: ", prompt);
//     const { data: openaiResponse } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Generate mad lib to fill out with using [] and no spaces inside the bracket. The mad lib adjectives are ${adjective},
//                verbs are ${verb},
//                nouns are ${noun},
//                and plural nouns are ${pluralNoun}.`,
//       max_tokens: 100,
//       temperature: 0.5,
//       n: 1,
//     });
//     const madLibText = openaiResponse.choices[0].text.trim();

//     // Use DALL-E to draw an image for the mad lib prompt
//     const { data: dalleResponse } = await axios.post(
//       "https://api.openai.com/v1/images/generations",
//       {
//         model: "image-alpha-001",
//         api_key: DALLE_API_KEY,
//         prompt: `${madLibText}\n\nDraw an image that represents the above prompt.`,
//         size: "256x256",
//         response_format: "url",
//       }
//     );
//     const imageUrl = dalleResponse.data[0].url;

//     // Return the generated mad lib text and image URL in the API response
//     res.status(200).json({ madLibText, imageUrl });
//   } catch (error) {
//     console.error(error);
//     return next({
//       status: 500,
//       message: error,
//     });
//   }
// }

// // Export the controller
// module.exports = {
//   madLibGenerator: [asyncErrorBoundary(getMadLib)],
// };
