import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageRoutes from "./PageRoutes";

describe("PageRoutes", () => {
  test("Should render home component on root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PageRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId("home")).to.not.be.null;
  });

  test("Should render not found component on undefined path", () => {
    render(
      <MemoryRouter initialEntries={["/this-is-not-a-real-route/alkjlkjasd"]}>
        <PageRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId("not-found")).to.not.be.null;
  });
});
