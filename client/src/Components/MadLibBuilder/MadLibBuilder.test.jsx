import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import MadLibBuilder from "./MadLibBuilder";
describe("MadLibBuilder", () => {
  it("Should display proper text when MadLib is an empty string", () => {
    render(<MadLibBuilder madLib="" />);
    const noMadLibText = screen.getByTestId("no-madlib-text").textContent;
    expect(noMadLibText).toEqual("No MadLib provided");
  });

  it("Should display proper text when MadLib is null", () => {
    render(<MadLibBuilder madLib={null} />);
    const noMadLibText = screen.getByTestId("no-madlib-text").textContent;
    expect(noMadLibText).toEqual("No MadLib provided");
  });

  it("Should display proper text when MadLib is undefined", () => {
    render(<MadLibBuilder />);
    const noMadLibText = screen.getByTestId("no-madlib-text").textContent;
    expect(noMadLibText).toEqual("No MadLib provided");
  });
});
