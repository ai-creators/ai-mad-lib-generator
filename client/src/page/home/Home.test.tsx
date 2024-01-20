import { describe, test } from "vitest";
import Home from "./Home";
import { renderWithRouter } from "../../test/testUtils";

describe("Home", () => {
  test("Should render home component", () => {
    renderWithRouter(<Home />);
  });
});
