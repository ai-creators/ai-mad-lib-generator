import { describe, test } from "vitest";
import { renderWithRouter } from "../../test/testUtils";
import Adlib from "./Adlib";

describe("Adlib", () => {
  test("Should render adlib component", () => {
    renderWithRouter(<Adlib />);
  });
});
