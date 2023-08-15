import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import Saves from "./Saves";
import { renderWithProviders } from "../../../tests/test-utils";
import { getSavesFixtures } from "../../../tests/fixtures/savesFixtures";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setAll } from "../../slices/savesSlice";

describe("Saves", () => {
  it("Should render the correct title and description", () => {
    renderWithProviders(<Saves />);

    const expectedHeader = "Saved Ad-Libs";
    const expectedDescription = "View your saved ad-libs";

    expect(screen.getByTestId("header").textContent).toBe(expectedHeader);
    expect(screen.getByTestId("description").textContent).toBe(
      expectedDescription
    );
  });

  it("Should show the correct message if no saves are available", () => {
    renderWithProviders(<Saves />);

    const expectedNotFoundMessage = "You don not have any saved Ad-Libs";

    expect(screen.getByTestId("no-ad-libs").textContent).toBe(
      expectedNotFoundMessage
    );
  });

  // it("Should have the clear saves button clickable if there is saves", () => {
  //   renderWithProviders(<Saves />, {
  //     preloadedState: {
  //       saves: getSavesFixtures(),
  //     },
  //   });

  //   const savesList = screen.getByTestId("saves-list");

  //   expect(savesList.children().length).toBeGreaterThan(0);
  // });

  // it("Should have the clear saves button and not be clickable if there is not any saves", () => {
  //   renderWithProviders(<Saves />);

  //   expect(screen.getByTestId("clear-saves-btn")).toBeDisabled();
  // });
});
