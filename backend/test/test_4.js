const request = require("supertest");
const assert = require("assert");
const app = require("../src/app");
const { Configuration, OpenAIApi } = require("openai");

describe("OpenAI API Tests", () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  it("should return a valid API key", () => {
    assert.ok(process.env.OPENAI_API_KEY, "API key is not valid");
  });

  it("should return a generated response from the OpenAI API", async () => {
    const prompt = "Translate the following English text to French: 'Hello, how are you?'";
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 20,
      temperature: 0.5,
      n: 1,
    });

    assert.ok(response.data.choices.length > 0, "No generated response found");
    assert.ok(response.data.choices[0].text.trim(), "Generated response is empty");
  });

  it("should return multiple generated responses when specified", async function () {
    this.timeout(10000); // Increase timeout to 10 seconds

    const prompt = "Write a short story about a cat.";
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
      temperature: 0.5,
      n: 3,
    });

    assert.strictEqual(response.data.choices.length, 3, "Number of generated responses is not as specified");
  });

  it("should limit the response length by the max_tokens parameter", async () => {
    const prompt = "Write a detailed summary of the history of computers.";
    const max_tokens = 25;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens,
      temperature: 0.5,
      n: 1,
    });

    assert.ok(response.data.choices[0].text.split(" ").length <= max_tokens, "Generated response exceeds max_tokens limit");
  });

  it("should generate a response influenced by the temperature parameter", async function () {
    this.timeout(10000); // Increase timeout to 10 seconds

    const prompt = "Write a paragraph about the benefits of exercise.";
    const lowTempResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
      temperature: 0.1,
      n: 1,
    });

    const highTempResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
      temperature: 1.0,
      n: 1,
    });

    assert.notStrictEqual(lowTempResponse.data.choices[0].text, highTempResponse.data.choices[0].text, "Generated responses are not influenced by temperature");
  });
});
