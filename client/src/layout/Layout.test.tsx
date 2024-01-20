import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

describe("Layout", () => {
  test("Should render the component", () => {
    render(
      <Layout>
        <h1>Test Header</h1>
      </Layout>
    );
  });

  test("Should render children", () => {
    render(
      <Layout>
        <h1>Test Header</h1>
      </Layout>
    );
    const headerElement = screen.queryByText("Test Header");
    expect(headerElement).not.to.be.null;
  });

  test("Should add bgColor", () => {
    const testBgColor = "bg-test-color";
    render(
      <Layout bgColor={testBgColor}>
        <div>Test Content</div>
      </Layout>
    );

    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");

    expect(header.className).to.include(testBgColor);
    expect(main.className).to.include(testBgColor);
  });

  test("Should add mainClassName to main element", () => {
    const testMainClassName = "test-main-class";
    render(
      <Layout mainClassName={testMainClassName}>
        <div>Test Content</div>
      </Layout>
    );

    const main = screen.getByRole("main");
    expect(main.className).to.include(testMainClassName);
  });
});
