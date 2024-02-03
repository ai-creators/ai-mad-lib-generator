import { describe, expect, test } from "vitest";
import App from "./App";
import { renderWithProviders } from "./test/test-utils";

describe("App", () => {
  test("DUMMY TEST", () => {
    expect(1 + 2).toEqual(3);
  });

  test("Should render app component", () => {
    renderWithProviders(<App />);
  });
});
