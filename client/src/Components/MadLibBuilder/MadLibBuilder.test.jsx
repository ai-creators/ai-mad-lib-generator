import { render, screen } from "@testing-library/react";
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

  it("Should return a form to build the madlib when it is passed the correct madlib", () => {
    const correctMadLib = "This is a [adjective] correct madlib";
    render(<MadLibBuilder madLib={correctMadLib} />);
    const madLibForm = screen.getByTestId("madlib-builder-form");
    expect(madLibForm).toBeDefined();
  });

  it("Should return proper text when MadLib is not properly formatted with brackets", () => {
    const invalidMadLib =
      "This is a test with [brackets improperly [formatted]";
    render(<MadLibBuilder madLib={invalidMadLib} />);
    const noMadLibText = screen.getByTestId("no-madlib-text").textContent;
    expect(noMadLibText).toEqual("MadLib incorrectly formatted");
  });

  it("Should return proper text when MadLib is not properly formatted with brackets", () => {
    const invalidMadLib =
      "This is a test with brackets] improperly [formatted]";
    render(<MadLibBuilder madLib={invalidMadLib} />);
    const noMadLibText = screen.getByTestId("no-madlib-text").textContent;
    expect(noMadLibText).toEqual("MadLib incorrectly formatted");
  });

  it("Should return proper text when MadLib is not properly formatted with brackets", () => {
    const invalidMadLib =
      "This is a test with brackets] improperly [formatted]";
    render(<MadLibBuilder madLib={invalidMadLib} />);
    const noMadLibText = screen.getByTestId("no-madlib-text").textContent;
    expect(noMadLibText).toEqual("MadLib incorrectly formatted");
  });
});
