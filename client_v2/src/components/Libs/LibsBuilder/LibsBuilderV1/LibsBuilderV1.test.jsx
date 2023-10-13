import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LibsBuilderV1 from "./LibsBuilderV1";
import { BrowserRouter } from "react-router-dom";

describe("LibsBuilderV1", () => {
  it("Should return the proper informational error if the adlib doesn't have any inserts", () => {
    const invalidAdlib = {
      text: "This is an invalid adlib without any inserts",
    };
    render(
      <BrowserRouter>
        <LibsBuilderV1 lib={invalidAdlib} />
      </BrowserRouter>
    );

    const expectedHeader = "This is an adlib with an invalid structure";
    const expectedDescription = "Go back to previous page or go back to home";

    expect(screen.getByTestId("error-header").textContent).toBe(expectedHeader);
    expect(screen.getByTestId("error-description").textContent).toBe(
      expectedDescription
    );
  });

  it("Should return the proper header of the prompt", () => {
    const adlib = {
      prompt: "This is a test prompt",
      text: "This is a test [noun] adlib with proper format",
    };

    render(
      <BrowserRouter>
        <LibsBuilderV1 lib={adlib} />
      </BrowserRouter>
    );

    const expectedHeader = "This is a test prompt...";

    expect(screen.getByTestId("prompt").textContent).toBe(expectedHeader);
  });
});
