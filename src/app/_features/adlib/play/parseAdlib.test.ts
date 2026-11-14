import { describe, expect, it } from "vitest";
import { fillAdlib, parseAdlib } from "./parseAdlib";

describe("parseAdlib", () => {
  it("replaces bracketed placeholders with numbered ones and records their type", () => {
    const { text, placeholders } = parseAdlib(
      "A [adjective] fox jumps over the [noun].",
    );

    expect(text).toBe("A [1] fox jumps over the [2].");
    expect(placeholders).toEqual([
      { type: "adjective", index: 0, original: "[adjective]" },
      { type: "noun", index: 1, original: "[noun]" },
    ]);
  });

  it("lowercases placeholder types", () => {
    const { placeholders } = parseAdlib("[PLURAL NOUN] are cool.");

    expect(placeholders[0]?.type).toBe("plural noun");
  });

  it("returns the text unchanged when there are no placeholders", () => {
    const { text, placeholders } = parseAdlib("No blanks here.");

    expect(text).toBe("No blanks here.");
    expect(placeholders).toEqual([]);
  });
});

describe("fillAdlib", () => {
  it("substitutes each numbered placeholder with the matching response", () => {
    const parsed = parseAdlib("A [adjective] fox jumps over the [noun].");

    const result = fillAdlib(parsed, ["sly", "fence"]);

    expect(result).toBe("A sly fox jumps over the fence.");
  });

  it("leaves a placeholder in place when no response was provided for it", () => {
    const parsed = parseAdlib("[noun] and [noun].");

    const result = fillAdlib(parsed, ["cats"]);

    expect(result).toBe("cats and [2].");
  });
});
