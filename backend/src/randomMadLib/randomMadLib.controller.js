const express = require("express");
const axios = require("axios");
const faker = require("faker");
const { OPENAI_API_KEY } = process.env.OPENAI_API_KEY;

const router = express.Router();

function* subjectGenerator() {
  while (true) {
    yield faker.random.word();
  }
}

function* adjectiveGenerator() {
  while (true) {
    yield faker.company.bsAdjective();
  }
}

function* nounGenerator() {
  while (true) {
    yield faker.random.word({ type: 'noun' });
  }
}

const randomSubject = subjectGenerator();
const randomAdjective = adjectiveGenerator();
const randomNoun = nounGenerator();

function getRandomPrompt() {
  const subject = randomSubject.next().value;
  const adjective = randomAdjective.next().value;
  const noun = randomNoun.next().value;
  return `Write a ${adjective} mad lib about ${subject} involving a ${noun}.`;
}

router.post("/", async (req, res) => {
  try {
    // Generate a random prompt
    const randomPrompt = getRandomPrompt();

    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: randomPrompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const madLib = openaiResponse.data.choices[0].text.trim();

    res.json({ madLib });
  } catch (error) {
    console.error("Error generating random mad lib:", error);
    res.status(500).json({ error: "Error generating random mad lib" });
  }
});

module.exports = randomGeneratorController;
