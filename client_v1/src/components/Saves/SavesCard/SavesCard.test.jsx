import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SavesCard from "./SavesCard";
import TestFixtures from "../../../../tests/fixtures/testFixtures";

describe("Saves", () => {
  it("Should render the correct title and description", () => {
    render(<SavesCard saves={[]} removeAllLibs={() => {}} />);

    const expectedHeader = "Saved Ad-Libs";
    const expectedDescription = "View your saved ad-libs";

    expect(screen.getByTestId("header").textContent).toBe(expectedHeader);
    expect(screen.getByTestId("description").textContent).toBe(
      expectedDescription
    );
  });

  it("Should show the correct message if no saves are available", () => {
    render(<SavesCard saves={[]} removeAllLibs={() => {}} />);

    const expectedNotFoundMessage = "You don not have any saved Ad-Libs";

    expect(screen.getByTestId("no-ad-libs").textContent).toBe(
      expectedNotFoundMessage
    );
  });

  it("Should have the clear saves button and not be clickable if there is not any saves", () => {
    render(<SavesCard saves={[]} removeAllLibs={() => {}} />);

    expect(screen.getByTestId("clear-saves-btn")).toBeDisabled();
  });
});
