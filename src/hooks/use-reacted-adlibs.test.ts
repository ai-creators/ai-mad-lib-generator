import { beforeEach, describe, expect, it } from "vitest";
import { useReactedAdlibsStore } from "./use-reacted-adlibs";

describe("useReactedAdlibsStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useReactedAdlibsStore.setState({ reactedIds: {} });
  });

  it("has not reacted by default", () => {
    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "like"),
    ).toBe(false);
    expect(
      useReactedAdlibsStore.getState().getReactionId("adlib-1", "like"),
    ).toBeUndefined();
  });

  it("marks a specific adlib/reaction pair as reacted, recording its reaction id", () => {
    useReactedAdlibsStore.getState().markReacted("adlib-1", "like", "rxn-1");

    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "like"),
    ).toBe(true);
    expect(
      useReactedAdlibsStore.getState().getReactionId("adlib-1", "like"),
    ).toBe("rxn-1");
    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "love"),
    ).toBe(false);
  });

  it("overwrites the reaction id when marking the same reaction again", () => {
    const { markReacted } = useReactedAdlibsStore.getState();

    markReacted("adlib-1", "like", "pending");
    markReacted("adlib-1", "like", "rxn-1");

    expect(
      useReactedAdlibsStore.getState().getReactionId("adlib-1", "like"),
    ).toBe("rxn-1");
  });

  it("unmarks a reaction, clearing its reaction id", () => {
    const { markReacted, unmarkReacted } = useReactedAdlibsStore.getState();

    markReacted("adlib-1", "like", "rxn-1");
    unmarkReacted("adlib-1", "like");

    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "like"),
    ).toBe(false);
    expect(
      useReactedAdlibsStore.getState().getReactionId("adlib-1", "like"),
    ).toBeUndefined();
  });

  it("leaves other reactions untouched when unmarking one", () => {
    const { markReacted, unmarkReacted } = useReactedAdlibsStore.getState();

    markReacted("adlib-1", "like", "rxn-1");
    markReacted("adlib-1", "love", "rxn-2");
    unmarkReacted("adlib-1", "like");

    expect(
      useReactedAdlibsStore.getState().hasReacted("adlib-1", "love"),
    ).toBe(true);
  });
});
