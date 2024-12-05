import { describe, expect, test } from "vitest";
import { formatSnakeCase, snakeToTitleCase } from "./formatSnakeCase";

describe("formatSnakeCase", () => {
  test("Should convert snake_case to space separated string", () => {
    const input = "hello_world_test";
    const expected = "hello world test";
    const result = formatSnakeCase(input);
    expect(result).toEqual(expected);
  });

  // Testing snakeToTitleCase function
  test("Should convert snake_case to Title Case", () => {
    const input = "hello_world_test";
    const expected = "Hello World Test";
    const result = snakeToTitleCase(input);
    expect(result).toEqual(expected);
  });
});
