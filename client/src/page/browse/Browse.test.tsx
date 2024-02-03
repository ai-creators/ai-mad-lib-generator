import { describe, test } from "vitest";
import { renderWithRouter } from "../../test/testUtils";
import Browse from "./Browse";

describe("Browse", () => {
  test("Should render browse component", () => {
    renderWithRouter(<Browse />);
  });
});
