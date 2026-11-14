import { beforeEach, describe, expect, it } from "vitest";
import { ContentRating, useContentRatingStore } from "./content-rating";

describe("useContentRatingStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useContentRatingStore.setState({ contentRating: ContentRating.PG });
  });

  it("defaults to PG", () => {
    expect(useContentRatingStore.getState().contentRating).toBe(
      ContentRating.PG,
    );
  });

  it("updates the content rating", () => {
    useContentRatingStore.getState().updateContentRating(ContentRating.NSFW);

    expect(useContentRatingStore.getState().contentRating).toBe(
      ContentRating.NSFW,
    );
  });

  it("persists the content rating to localStorage", () => {
    useContentRatingStore.getState().updateContentRating(ContentRating.NSFW);

    const raw = localStorage.getItem("contentRating");
    const parsed = JSON.parse(raw!) as {
      state: { contentRating: ContentRating };
    };
    expect(parsed.state.contentRating).toBe(ContentRating.NSFW);
  });
});
