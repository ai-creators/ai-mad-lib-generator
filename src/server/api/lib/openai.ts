/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface MadlibResponse {
  title: string;
  madlib: string;
  isPg: boolean;
}

/**
 * Type guard to check if an object conforms to the MadlibResponse interface.
 */
function isMadlibResponse(obj: unknown): obj is MadlibResponse {
  if (typeof obj !== "object" || obj === null) return false;
  const maybe = obj as Record<string, unknown>;
  return (
    typeof maybe.title === "string" &&
    typeof maybe.madlib === "string" &&
    typeof maybe.isPg === "boolean"
  );
}

/**
 * Uses OpenAI's API to generate a madlib story based on the provided prompt.
 * The response is expected to be a JSON object with the following keys:
 * - title: A creative title for the madlib.
 * - madlib: A full madlib story that includes placeholders such as [adjective], [noun], etc.
 * - isPg: A boolean indicating if the madlib is appropriate for all ages.
 *
 * @param prompt - A short prompt for the madlib (e.g., "mystery manor").
 * @returns A promise that resolves with the JSON object containing the madlib details.
 */
export async function createMadlib(
  prompt: string,
  config?: {
    temperature: number;
  },
): Promise<MadlibResponse> {
  const systemMessage = `
You are a creative madlib generator. Generate a fun, creative madlib story based on the prompt provided.
Your response must be a valid JSON object with the following keys:
  - "title": A creative title for the madlib.
  - "madlib": A full madlib story that includes placeholders such as [adjective], [noun], [plural noun], [relative].
  - "isPg": A boolean value which is true if the madlib is appropriate for all ages (PG) and false otherwise.
For example, if the prompt is "mystery manor", produce a madlib similar to:
{
  "title": "Mystery Manor Mayhem",
  "madlib": "Once upon a time, in a [adjective] manor, there lived a [noun] who was rumored to be a [adjective] magician. The [noun] was known for their [adjective] personality and their love for [plural noun]. One day, a [adjective] stranger arrived at the manor, claiming to be a long-lost [relative]. The [adjective] stranger brought with them a [noun], which was said to hold the secret to the manor's hidden [noun]. As the [adjective] stranger and the [noun] began to unravel the mystery of the manor, they encountered many [plural noun] and faced numerous [adjective] challenges. In the end, the truth about the manor was revealed, and its [adjective] secrets were finally uncovered.",
  "isPg": true
}
Only return the JSON object with these keys and no additional text.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      max_tokens: 400,
      ...config,
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("No choices returned from OpenAI");
    }

    const message = response?.choices[0]?.message;
    if (!message?.content) {
      throw new Error("No message content returned from OpenAI");
    }

    const jsonResponse = message.content.trim();
    const result = JSON.parse(jsonResponse || "{}");

    if (
      typeof result.title !== "string" ||
      typeof result.madlib !== "string" ||
      typeof result.isPg !== "boolean"
    ) {
      throw new Error("Invalid response format");
    }

    const parsed: unknown = JSON.parse(jsonResponse);
    if (!isMadlibResponse(parsed)) {
      throw new Error("Invalid response format");
    }
    return parsed;
  } catch (error) {
    console.error("Error generating madlib:", error);
    throw error;
  }
}
