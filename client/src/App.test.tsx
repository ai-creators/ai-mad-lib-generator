import { describe, expect, test } from "vitest";
import App from "./App";
import { renderWithRouter } from "./test/testUtils";

describe("App", () => {
  test("DUMMY TEST", () => {
    expect(1 + 2).toEqual(3);
  });

  test("Should render app component", () => {
    renderWithRouter(<App />);
  });
});
