import { describe, it, expect } from "vitest";
import { isValidAdlib } from "./isValidAdlib";

describe("isValidAdlib", () => {
  it("Should return false if the adlib does not have equal brackets", () => {
    const invalidAdlib = "This is a [test adlib";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib does not have equal brackets", () => {
    const invalidAdlib = "This is a [testadlib and does not format properly";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib does not have equal brackets", () => {
    const invalidAdlib = "This is a [test]adlib and does not format properly";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib does not have equal brackets", () => {
    const invalidAdlib = "This is a [test]adlib and does not noun] properly";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib does not have equal brackets", () => {
    const invalidAdlib = "This is a testadlib and does not noun] properly";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib does not have equal brackets", () => {
    const invalidAdlib = "This is a testadlib and does not noun] properly";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib does not have brackets in correct order", () => {
    const invalidAdlib = "This is a test adlib and does not ]noun[ properly";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib inputs have at least one input with that is empty", () => {
    const invalidAdlib = "This is a test adlib and it is not a proper [] one";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib inputs have at least one input with a space", () => {
    const invalidAdlib = "This is a test adlib and it is not a proper [ ] one";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib input is improperly structured", () => {
    const invalidAdlib = "[This is a test adlib and it is not a proper one]";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib input is a nested", () => {
    const invalidAdlib =
      "This is a test adlib [[noun]] and it is not a proper one";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return false if the adlib does not have any inputs", () => {
    const invalidAdlib = "This is a test adlib and it is not a proper one";
    expect(isValidAdlib(invalidAdlib)).toBeFalsy();
  });

  it("Should return true if the adlib is valid", () => {
    const validAdlib = "This is a test valid adlib [noun]";
    expect(isValidAdlib(validAdlib)).toBeTruthy();
  });

  it("Should return true if the adlib is valid", () => {
    const validAdlib = "This is a [adjective] test valid adlib [noun]";
    expect(isValidAdlib(validAdlib)).toBeTruthy();
  });
});
