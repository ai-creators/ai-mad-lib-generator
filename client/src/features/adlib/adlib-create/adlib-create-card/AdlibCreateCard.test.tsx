import { describe, test } from "vitest";
import AdlibCreateCard from "./AdlibCreateCard";
import { renderWithRouter } from "@/test/testUtils";

describe("AdlibCreateCard", () => {
  test("Should render the component", () => {
    renderWithRouter(<AdlibCreateCard />);
  });
});
