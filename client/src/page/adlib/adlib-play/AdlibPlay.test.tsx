import { renderWithRouter } from "@/test/testUtils";
import { describe, test } from "vitest";
import AdlibPlay from "./AdlibPlay";

describe("AdlibPlay", () => {
  test("Should render adlibPlay component", () => {
    renderWithRouter(<AdlibPlay />);
  });
});
