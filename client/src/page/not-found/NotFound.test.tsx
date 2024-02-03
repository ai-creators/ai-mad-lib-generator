import { describe, test } from "vitest";
import { renderWithRouter } from "../../test/testUtils";
import NotFound from "./NotFound";

describe("NotFound", () => {
  test("Should render home component", () => {
    renderWithRouter(<NotFound />);
  });
});
