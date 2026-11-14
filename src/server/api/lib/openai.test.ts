import { beforeEach, describe, expect, it, vi } from "vitest";

const parseCompletion = vi.fn();
const createModeration = vi.fn();

vi.mock("openai", () => ({
  default: vi.fn().mockImplementation(function MockOpenAI() {
    return {
      chat: { completions: { parse: parseCompletion } },
      moderations: { create: createModeration },
    };
  }),
}));

vi.mock("openai/helpers/zod", () => ({
  zodResponseFormat: vi.fn().mockReturnValue({}),
}));

const { createMadlib } = await import("./openai");

function mockParsedMessage(message: Record<string, unknown>) {
  parseCompletion.mockResolvedValue({ choices: [{ message }] });
}

describe("createMadlib", () => {
  beforeEach(() => {
    parseCompletion.mockReset();
    createModeration.mockReset();
  });

  const validResponse = {
    title: "Mystery Manor",
    madlib: "A [adjective] house.",
    isPg: true,
    categories: ["Mystery"],
  };

  it("keeps isPg true when the model self-reports PG and moderation passes", async () => {
    mockParsedMessage({ parsed: validResponse, refusal: null });
    createModeration.mockResolvedValue({ results: [{ flagged: false }] });

    const result = await createMadlib("a spooky house");

    expect(result.isPg).toBe(true);
  });

  it("forces isPg to false when moderation flags the content, even if the model self-reported PG", async () => {
    mockParsedMessage({ parsed: validResponse, refusal: null });
    createModeration.mockResolvedValue({ results: [{ flagged: true }] });

    const result = await createMadlib("a spooky house");

    expect(result.isPg).toBe(false);
  });

  it("never upgrades isPg to true when the model self-reported it as not PG", async () => {
    mockParsedMessage({
      parsed: { ...validResponse, isPg: false },
      refusal: null,
    });
    createModeration.mockResolvedValue({ results: [{ flagged: false }] });

    const result = await createMadlib("a spooky house");

    expect(result.isPg).toBe(false);
  });

  it("throws when the model has no parsed content", async () => {
    mockParsedMessage({ parsed: null, refusal: null });

    await expect(createMadlib("a spooky house")).rejects.toThrow();
    expect(createModeration).not.toHaveBeenCalled();
  });

  it("throws when the model refuses to generate the madlib", async () => {
    mockParsedMessage({ parsed: null, refusal: "unsafe content" });

    await expect(createMadlib("a spooky house")).rejects.toThrow();
    expect(createModeration).not.toHaveBeenCalled();
  });
});
