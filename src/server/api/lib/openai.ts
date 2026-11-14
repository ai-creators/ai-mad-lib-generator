import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const madlibResponseSchema = z.object({
  title: z.string(),
  madlib: z.string(),
  isPg: z.boolean(),
  categories: z.array(z.string()),
});

type MadlibResponse = z.infer<typeof madlibResponseSchema>;

/**
 * Runs OpenAI's moderation endpoint over generated content. This is the
 * authoritative safety check: the generation model's own "isPg" self-report
 * is never trusted on its own, since the same model that wrote the content
 * is a poor judge of whether it's appropriate.
 */
async function isContentFlagged(input: string): Promise<boolean> {
  const moderation = await openai.moderations.create({
    model: "omni-moderation-latest",
    input,
  });

  return moderation.results.some((result) => result.flagged);
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
    tone?: string | null;
  },
): Promise<MadlibResponse> {
  let systemMessage = `
You are a creative madlib generator. Generate a fun, creative madlib story based on the prompt provided.
  - "title": A creative title for the madlib.
  - "madlib": A full madlib story that includes placeholders such as [adjective], [noun], [plural noun], [relative].
  - "isPg": true if the madlib is appropriate for all ages (PG), false otherwise.
  - "categories": The relevant categories of the madlib.
For example, if the prompt is "mystery manor", produce a madlib similar to:
{
  "title": "Mystery Manor Mayhem",
  "madlib": "Once upon a time, in a [adjective] manor, there lived a [noun]...",
  "isPg": true,
  "categories": ["Mystery", "Adventure"]
}
Include at least 5 placeholders in the madlib. The longer the madlib the more placeholders you should add. make it at least 3 sentences and at most 9 sentences. placesholders should take about 15% of the words.`;

  if (config?.tone) {
    systemMessage += `\n\nAdd this tone/personality to the madlib: ${config.tone}`;
  }

  try {
    const completion = await openai.chat.completions.parse({
      model: "gpt-5.4-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      max_completion_tokens: 400,
      temperature: config?.temperature ?? 1,
      response_format: zodResponseFormat(
        madlibResponseSchema,
        "madlib_response",
      ),
    });

    const message = completion.choices[0]?.message;
    if (!message) {
      console.error({
        message: "OpenAI API returned no choices",
        prompt,
        config,
        completion,
      });
      throw new Error("No choices returned from OpenAI");
    }

    if (message.refusal) {
      console.error({
        message: "OpenAI refused to generate the madlib",
        prompt,
        config,
        refusal: message.refusal,
      });
      throw new Error("OpenAI refused to generate the madlib");
    }

    if (!message.parsed) {
      console.error({
        message: "OpenAI response failed schema validation",
        prompt,
        config,
        completion,
      });
      throw new Error("Invalid response format");
    }

    const flagged = await isContentFlagged(
      `${message.parsed.title}\n\n${message.parsed.madlib}`,
    );

    return {
      ...message.parsed,
      isPg: message.parsed.isPg && !flagged,
    };
  } catch (error) {
    console.error({
      message: "Error generating madlib",
      prompt,
      config,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}
