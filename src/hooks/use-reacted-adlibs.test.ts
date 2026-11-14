import { beforeEach, describe, expect, it } from "vitest";
import { useReactedAdlibsStore } from "./use-reacted-adlibs";

describe("useReactedAdlibsStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useReactedAdlibsStore.setState({ reactedKeys: [] });
  });

  it("has not reacted by default", () => {
    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "like"),
    ).toBe(false);
  });

  it("marks a specific adlib/reaction pair as reacted", () => {
    useReactedAdlibsStore.getState().markReacted("adlib-1", "like");

    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "like"),
    ).toBe(true);
    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "love"),
    ).toBe(false);
  });

  it("does not duplicate an entry when marking the same reaction twice", () => {
    const { markReacted } = useReactedAdlibsStore.getState();

    markReacted("adlib-1", "like");
    markReacted("adlib-1", "like");

    expect(useReactedAdlibsStore.getState().reactedKeys).toEqual([
      "adlib-1:like",
    ]);
  });
});
