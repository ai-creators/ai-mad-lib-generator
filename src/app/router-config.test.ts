import { describe, expect, it } from "vitest";
import { routerConfig } from "./router-config";

describe("routerConfig", () => {
  it("builds a browse search URL with the query encoded", () => {
    expect(routerConfig.browse.execute({ search: "cats & dogs" })).toBe(
      "/browse?q=cats%20%26%20dogs",
    );
  });

  it("builds an adlib play URL", () => {
    expect(routerConfig.adlibPlay.execute({ id: "abc 123" })).toBe(
      "/adlib/abc%20123/play",
    );
  });

  it("builds an adlib play result URL", () => {
    expect(
      routerConfig.adlibPlayResult.execute({
        adlibId: "abc",
        resultId: "def",
      }),
    ).toBe("/adlib/abc/play/def");
  });

  it("builds an adlib detail URL", () => {
    expect(routerConfig.adlib.execute({ id: "abc" })).toBe("/adlib/abc");
  });

  it("builds a categories search URL with the query encoded", () => {
    expect(routerConfig.categories.execute({ category: "sci-fi" })).toBe(
      "/categories?q=sci-fi",
    );
  });
});
